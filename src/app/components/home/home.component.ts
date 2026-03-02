import { Component, OnInit } from '@angular/core';
import { BanknService} from '../../services/bankn.service';
import { AccountService} from '../../services/account.service';
import { EventsService} from '../../services/events.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {

  hasBankn:Boolean = false;
  hasAccounts:Boolean = false;

  constructor(
    private eventsService:EventsService,
    private banknService:BanknService,
    private accountService:AccountService,
  ) { 
    
  }

  ngOnInit() {
    this.refreshData();
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
  }

  refreshData(){
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length>0;
  }

  OneDrivedriveSuccess(files: any){
    console.log(files);
  }

  onOnedriveCancel(){
    console.log('Onedrive close/cancel!');
  }
}