import { Injectable, Inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Account } from "../models/account";
import { Transaction } from "../models/transaction";
import { AccountService } from '../services/account.service';

@Injectable({providedIn: 'root'})
export class TransactionService {

  constructor(
    private accountService : AccountService
  ) { }

  createTransaction(){
    uidv4();
  }

  toJson(transactions:Transaction[]){
    var results = [];
    transactions.forEach(transaction => {
      results.push(new Transaction(
        transaction.id,
        transaction.amount.toUnit(),//Dinero to value, compacted result
        transaction.date,
        transaction.toAccount,
        transaction.entity,
        transaction.category,
        transaction.description
      ));
    });
    return results;
  }

  fromJson(json, currency:String){
    var results = [];
    if(json!=null){
      json.forEach(transaction => {
        results.push(new Transaction(
          transaction.id,
          this.accountService.toDinero(currency, transaction.amount),//value to Dinero, speed
          transaction.date,
          transaction.toAccount,
          transaction.entity,
          transaction.category,
          transaction.description
        ));
      });
    }
    return results;
  }

  getSelectedAccountsTransactions() : Transaction[]{
    var accounts : Account[] = this.accountService.getSelectedAccounts();
    return this.getTransactions(accounts);
  }

  getTransactions(accounts : Account[]) : Transaction[] {
    var transactions : Transaction[] = [];
    accounts.forEach(account => {
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    transactions = transactions.sort(this.compareTransaction);
    return transactions;
  }

  compareTransaction(a:Transaction,b:Transaction){
    return b.date-a.date;
  }
}