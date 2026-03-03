import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: false
})
export class MainComponent implements OnInit {
  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;

  constructor(
    private banknService: BanknService,
    private eventsService: EventsService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
    this.refreshData();
  }

  refreshData() {
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length > 0;
  }

  onOpen() {
    this.banknService.loadFromFile();
  }
}
