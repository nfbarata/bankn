import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { Account } from "../../models/account";

@Component({
    selector: 'app-main-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: false
})
export class MenuComponent implements OnInit {
  
  accounts:Account[] = [];
  hasBankn:Boolean = false;

  constructor(
    private banknService: BanknService,
    private accountService: AccountService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.refreshData();
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
  }

  refreshData(){
    this.hasBankn = this.banknService.initialized();
    if(this.hasBankn){
      this.accounts = this.accountService.getAccounts(); 
    }
  }

  onAccountClick(account:Account){
    this.accountService.toggleAccount(account);
  }

  onSaveAs(){
    this.banknService.saveToFile();
  }
  
  //onexport account to csv
}