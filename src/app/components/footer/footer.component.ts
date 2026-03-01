import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
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
  form = new UntypedFormGroup({
    startDate: new UntypedFormControl(),
    endDate: new UntypedFormControl()
  });

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
    if (this.hasBankn) {
      if (this.banknService.getBankn()!.transactionsStartDate)
        this.form.value.startDate = this.banknService.getBankn()!.transactionsStartDate;
      else
        this.form.value.startDate = "";
      if (this.banknService.getBankn()?.transactionsEndDate)
        this.form.value.endDate = this.banknService.getBankn()?.transactionsEndDate;
      else
        this.form.value.endDate = "";
    }
  }

  onDateChange() {
    this.banknService.setTransactionPeriod(
      this.form.value.startDate ? new Date(this.form.value.startDate): undefined, 
      this.form.value.endDate ? new Date(this.form.value.endDate) : undefined
    );
  }
}
