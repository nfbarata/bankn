import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;

  constructor(
    private banknService: BanknService,
    private eventsService: EventsService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.eventsService.banknChange.subscribe(() => this.refreshData());
    this.eventsService.accountsChange.subscribe(() => this.refreshData());

    // initialize with test data
    if (!environment.production && environment.exampleFile != null) {
      console.log("initializing with test data");
      fetch(environment.exampleFile)
        .then(response => response.json())
        .then(data => {
          this.banknService.setBankn(BanknService.fromJson(data));
          this.refreshData();
        })
        .catch(error => console.error('Error loading example file:', error));
    } else {
      this.refreshData();
    }
  }

  refreshData() {
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length > 0;
  }

  onOpen() {
    this.banknService.loadFromFile();
  }
}
