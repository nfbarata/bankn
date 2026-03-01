import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;

  constructor(
    private banknService: BanknService,
    private eventsService: EventsService,
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.eventsService.banknChange.subscribe(() => this.refreshData());
    this.eventsService.accountsChange.subscribe(() => this.refreshData());

    this.refreshData();
  }

  refreshData() {
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length > 0;
  }
}
