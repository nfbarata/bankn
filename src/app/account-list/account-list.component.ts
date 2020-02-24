import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  accounts = [];

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }

  open(){
    
  }
}