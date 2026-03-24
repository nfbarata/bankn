import { Component, OnInit, inject } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { EventsService } from '../../../services/events.service';
import { Account } from "../../../models/account";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'transactions-import-card',
    templateUrl: './transactions-import-card.component.html',
    styleUrls: ['./transactions-import-card.component.css'],
    imports: [FormsModule, RouterLink]
})
export class TransactionsImportCardComponent implements OnInit {
  private accountService = inject(AccountService);
  private eventsService = inject(EventsService);

  
  accounts:Account[] = [];
  selectedAccount:Account | null=null;
  newSelectedAccount:String | null=null;

  ngOnInit() {
    this.refreshData();
    this.refreshSelectionData()
    this.eventsService.subscribeAccountsChange(() => this.refreshData());
    this.eventsService.subscribeAccountSelectionChange(() => this.refreshSelectionData());
  }

  refreshData(){
    this.accounts = this.accountService.getAccounts(); 
  }

  refreshSelectionData(){
    if(this.accounts.length>0){
      var selectedAccounts = this.accountService.getSelectedAccounts();
      if(selectedAccounts.length>0){
        this.selectedAccount=selectedAccounts[0];
      }else{
        this.selectedAccount=this.accounts[0];
      }
      this.newSelectedAccount = this.selectedAccount.id;
    }
  }

  onAccountChangeHandler (event: any) {
    this.newSelectedAccount = event.target.value;
  }

}