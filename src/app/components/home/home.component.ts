import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BanknService} from '../../services/bankn.service';
import { AccountService} from '../../services/account.service';
import { EventsService} from '../../services/events.service';
import { BanknCreateCardComponent } from '../../modules/shared/components/bankn-create-card/bankn-create-card.component';
import { FileOpenCardComponent } from '../../modules/shared/components/file-open-card/file-open-card.component';
import { TransactionCreateCardComponent } from '../../modules/shared/components/transaction-create-card/transaction-create-card.component';
import { TransactionsImportCardComponent } from '../../modules/shared/components/transactions-import-card/transactions-import-card.component';
import { AccountCreateCardComponent } from '../../modules/shared/components/account-create-card/account-create-card.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [BanknCreateCardComponent, FileOpenCardComponent, TransactionCreateCardComponent, TransactionsImportCardComponent, AccountCreateCardComponent]
})
export class HomeComponent implements OnInit {
  private eventsService = inject(EventsService);
  private banknService = inject(BanknService);
  private accountService = inject(AccountService);
  private cdr = inject(ChangeDetectorRef);


  hasBankn:Boolean = false;
  hasAccounts:Boolean = false;

  ngOnInit() {
    this.refreshData();
    this.eventsService.subscribeBanknChange(() => this.refreshData());
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
  }

  refreshData(){
    this.hasBankn = this.banknService.initialized();
    this.hasAccounts = this.accountService.getAccounts().length>0;
    this.cdr.detectChanges();
  }

  OneDrivedriveSuccess(files: any){
    console.log(files);
  }

  onOnedriveCancel(){
    console.log('Onedrive close/cancel!');
  }
}