import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../services/events.service';
import { AccountService } from '../../../../services/account.service';
import { TransactionService } from '../../../../services/transaction.service';
import { Account } from '../../../../models/account';
import { Transaction } from '../../../../models/transaction';
import { Dinero, add, subtract } from 'dinero.js';
import { TransactionType } from '../../../../models/enums';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  
  hasRealTransactions: boolean = false;
  transactions: Transaction[] = [];
  initialBalance: Dinero<number>|null = null;
  selectedAccounts: Account[] = [];
  accounts: Account[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    
    this.refreshAccounts();
    
    this.eventsService.accountSelectionChange.subscribe(() => this.refreshData());
    
    this.eventsService.accountsChange.subscribe(() => this.refreshAccounts());
    
    this.route.paramMap.subscribe((params) => {
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
    });
  }

  refreshData() {
    
    //clear
    while (this.transactions.length > 0) 
    	this.transactions.pop();
    
    this.hasRealTransactions = false;

    var newTransactions: Transaction[] = [];

    this.selectedAccounts = this.accountService.getSelectedAccounts();

    if (this.selectedAccounts.length > 0) {
      this.selectedAccounts.forEach((account) => {
        newTransactions = newTransactions.concat(account.transactions);
        if (!this.hasRealTransactions && account.transactions.length > 0)
          this.hasRealTransactions = true;
      });

      //get initial value
      let initialValue = this.accountService.getInitialValueMultiple(
        this.selectedAccounts
      );

      //sort (from multiple accounts)
      TransactionService.sortTransactions(newTransactions);

      //calculate balances
      this.applyBalanceToTransactions(newTransactions, initialValue);

      this.transactions = newTransactions;
      if(this.transactions.length>0)
      	this.initialBalance = this.transactions[this.transactions.length-1].balanceBefore;
      else
      	this.initialBalance = null;
    }
  }

  refreshAccounts() {
    this.accounts = this.accountService.getAccounts();
    this.refreshData();
  }

  applyBalanceToTransactions(
    transactions: Transaction[],
    initialValue: Dinero<number>
  ): void {
    //update meta sum for all accounts and invert order
    var accumulatedBalance = initialValue;

    //add meta balance for this account
    for (let i = transactions.length - 1; i >= 0; i--) {
      transactions[i].balanceBefore = accumulatedBalance;
      switch (transactions[i].type) {
        case TransactionType.CREDIT:
          accumulatedBalance = add(accumulatedBalance,transactions[i].amount);
          break;
        case TransactionType.DEBIT:
          accumulatedBalance = subtract(accumulatedBalance, transactions[i].amount);
          break;
      }
      transactions[i].balanceAfter = accumulatedBalance;
    }
  }
}
