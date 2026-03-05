import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { Account } from "../../models/account";
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-main-menu',
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.css'],
    imports: [RouterLink, FormsModule]
})
export class MenuComponent implements OnInit {
  private banknService = inject(BanknService);
  private accountService = inject(AccountService);
  private eventsService = inject(EventsService);
  private cdr = inject(ChangeDetectorRef);

  
  accounts:Account[] = [];
  hasBankn:Boolean = false;

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
    this.cdr.detectChanges();
  }

  onAccountClick(account:Account){
    this.accountService.toggleAccount(account);
  }

  onSaveAs(){
    this.banknService.saveToFile();
  }
  
  //onexport account to csv
}