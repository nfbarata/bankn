import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { AccountService } from '../../services/account.service';
import { UtilsService } from '../../services/utils.service';
import { Account } from '../../models/account';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;
  accounts: Account[] = [];
  newTransactionSelectedAccount: String | null = null;

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
    this.eventsService.accountSelectionChange.subscribe(() => this.refreshData());

    this.refreshData();
  }

  refreshData() {
    this.hasBankn = this.banknService.initialized();
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

    this.accounts = this.accountService.getAccounts();
    this.hasAccounts = this.accounts.length > 0;

    var selectedAccounts = this.accountService.getSelectedAccounts();
    if (selectedAccounts.length > 0) {
      this.newTransactionSelectedAccount = selectedAccounts[0].id;
    }
  }

  onDateChange() {
    this.banknService.setTransactionPeriod(
      this.form.value.startDate ? UtilsService.removeTime(new Date(this.form.value.startDate)) : undefined,
      this.form.value.endDate ? UtilsService.removeTime(new Date(this.form.value.endDate)) : undefined
    );
  }

  onNewTransactionAccountChangeHandler(event: any) {
    this.newTransactionSelectedAccount = event.target.value;
  }
}
