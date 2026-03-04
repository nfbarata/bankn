import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  private banknService = inject(BanknService);
  private eventsService = inject(EventsService);
  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);


  hasBankn: Boolean = false;
  hasAccounts: Boolean = false;
  accounts: Account[] = [];
  newTransactionSelectedAccount: String | null = null;

  form = new UntypedFormGroup({
    startDate: new UntypedFormControl(),
    endDate: new UntypedFormControl()
  });

  ngOnInit() {
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
    this.eventsService.subscribeAccountSelectionChange(() => this.refreshData());

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
      this.cdr.detectChanges()
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
