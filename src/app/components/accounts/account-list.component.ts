import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { Account } from "../../models/account";
import { RouterLink } from '@angular/router';
import { AccountCreateCardComponent } from '../shared/account-create-card/account-create-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'account-list',
    standalone: true,
    imports: [CommonModule, RouterLink, AccountCreateCardComponent],
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, OnDestroy {
  private readonly eventsService = inject(EventsService);
  private readonly accountService = inject(AccountService);
  
  private subscriptions = new Subscription();
  accounts: Account[] = [];

  ngOnInit() {
    this.refreshAccounts();
    this.subscriptions.add(this.eventsService.subscribeAccountsChange(() => this.refreshAccounts()));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();  
  }
}