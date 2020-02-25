import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import  { Account } from "../../models/account";

@Component({
  selector: 'account-select',
  templateUrl: './account-select.component.html',
  styleUrls: ['./account-select.component.css']
})
export class AccountSelectComponent implements OnInit {

  items: any[] = [];

  constructor(
     private accountService: AccountService
  ) { }

  ngOnInit() {
    this.refreshAccounts();
    this.accountService.accountsChange.subscribe(()=>{
      this.refreshAccounts();
    });  
  }

  refreshAccounts(){
    var accounts:[Account] = this.accountService.getAccounts()
    ;
    while (this.items.length > 0) {
      this.items.pop();
    }
    accounts.forEach(account => {
      this.items.push({
        id : account.id,
        name : account.name,
        selected : account.selected
      });
    });
  }

  onAccountsSelected(){
    this.items.forEach(item => {
       this.accountService.selectAccount(item.selected);
    });
  }
}