import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { Dinero } from 'dinero.js';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { DineroPipe } from "../../pipes/dinero.pipe";
import { TransactionPipe } from "../../pipes/transaction.pipe";
import { CategoryPipe } from "../../pipes/category.pipe";
import { TransactionCreateCardComponent } from "../shared/transaction-create-card/transaction-create-card.component";
import { TransactionsImportCardComponent } from "../shared/transactions-import-card/transactions-import-card.component";
import { AccountSelectCardComponent } from "../shared/account-select-card/account-select-card.component";
import { AccountCreateCardComponent } from "../shared/account-create-card/account-create-card.component";

@Component({
    selector: 'app-transaction-list',
    standalone: true,
    imports: [CommonModule, RouterLink, FormsModule, DatePipe, DineroPipe, TransactionPipe, CategoryPipe, TransactionCreateCardComponent, TransactionsImportCardComponent, AccountSelectCardComponent, AccountCreateCardComponent],
    templateUrl: './transaction-list.component.html',
    styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private eventsService = inject(EventsService);
  private accountService = inject(AccountService);

  private subscriptions = new Subscription();

  hasRealTransactions: boolean = false;
  transactions: Transaction[] = [];
  initialBalance: Dinero<number> | null = null;
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];
  newTransactionSelectedAccount: String | null = null;

  ngOnInit() {
    this.refreshAccounts()

    this.subscriptions.add(this.eventsService.subscribeAccountSelectionChange(() => this.refreshData()));
    this.subscriptions.add(this.eventsService.subscribeAccountsChange(() => this.refreshAccounts()));
    this.subscriptions.add(this.eventsService.subscribeTransactionPeriodChange(() => this.refreshData()));

    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      var accountId = params.get('accountId');
      if (accountId == null || accountId.trim().length == 0) {
        //do nothing
      } else {
        this.accounts.forEach((account) => {
          if (account.id == accountId) {
            this.accountService.selectAccount(account);
          } else {
            if (account.selected) {
              this.accountService.toggleAccount(account);
            }
          }
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  refreshAccounts() {
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  refreshData() {
    while (this.transactions.length > 0)
      this.transactions.pop();

    this.hasRealTransactions = false;

    var newTransactions: Transaction[] = [];

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    if (this.selectedAccounts.length > 0) {

      this.newTransactionSelectedAccount = this.selectedAccounts[0].id;

      this.selectedAccounts.forEach((account) => {
        newTransactions = newTransactions.concat(this.accountService.getCurrentPeriodTransactions(account));
        if (!this.hasRealTransactions && account.transactions.length > 0)
          this.hasRealTransactions = true;
      });

      let initialValue = this.accountService.getInitialValueMultipleForCurrentPeriod(this.selectedAccounts);

      TransactionService.sortTransactions(newTransactions);

      TransactionService.applyBalanceToTransactions(newTransactions, initialValue);

      this.transactions = newTransactions;
      if (this.transactions.length > 0)
        this.initialBalance = this.transactions[this.transactions.length - 1].balanceBefore;
      else
        this.initialBalance = initialValue;
    }
  }

  onNewTransactionAccountChangeHandler(event: any) {
    this.newTransactionSelectedAccount = event.target.value;
  }
}
