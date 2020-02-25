import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import  { Account } from "../../shared/models/account";

@Component({
  selector: 'bankn-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  accounts = [];
  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();  
  }

  onAccountClick(account:Account){
    this.accountService.toggleAccount(account);
  }
}