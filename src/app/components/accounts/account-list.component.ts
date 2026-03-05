import { Component, OnInit, inject } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { Account } from "../../models/account";
import { RouterLink } from '@angular/router';
import { AccountCreateCardComponent } from '../shared/account-create-card/account-create-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'account-list',
    imports: [CommonModule, RouterLink, AccountCreateCardComponent],
    templateUrl: './account-list.component.html',
    styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  private readonly eventsService = inject(EventsService);
  private readonly accountService = inject(AccountService);
  
  accounts: Account[] = [];

  ngOnInit() {
    this.refreshAccounts();
    this.eventsService.subscribeAccountsChange(() => this.refreshAccounts());
  }

  refreshAccounts(){
    this.accounts = this.accountService.getAccounts();  
  }
}