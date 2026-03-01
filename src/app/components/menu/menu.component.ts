import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { BanknService } from '../../services/bankn.service';
import { FileService } from '../../services/file.service';
import { EventsService } from '../../services/events.service';
import { Account } from "../../models/account";

@Component({
  selector: 'app-main-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
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
    this.eventsService.subscribeBanknChange(this.refreshData);
    this.eventsService.accountsChange.subscribe(()=>this.refreshData());
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