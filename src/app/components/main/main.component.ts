import { Component, OnInit, inject } from '@angular/core';
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
  private banknService = inject(BanknService);
  private eventsService = inject(EventsService);
  private accountService = inject(AccountService);

  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;

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
