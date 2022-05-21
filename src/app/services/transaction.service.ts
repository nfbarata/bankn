import { Injectable } from '@angular/core';

import { UUID } from 'angular2-uuid';

import { EventsService } from './events.service';
import { AccountService } from './account.service';

import { Account } from '../models/account';
import { Transaction, TransactionType } from '../models/transaction';
import Dinero from 'dinero.js';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  //for use between screens
  importTransactions: any[] = []; //volatile
  filterTransactions: any[] = []; //volatile
  filterActions: any[] = []; //volatile

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService
  ) {}

  createTransaction(
    account: Account,
    amount: Dinero.Dinero,
    date: Date,
    type: TransactionType,
    entity: string | null,
    category: string | null,
    description: string | null
  ) {
    var clearDate = new Date(0); //clear hours/minutes/seconds
    clearDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    var transaction = new Transaction(
      UUID.UUID(),
      amount,
      clearDate,
      entity,
      category,
      description,
      type,
      account
    );
    this.accountService.addTransaction(account, transaction);
  }

  updateTransaction(
    account: Account,
    transaction: Transaction,
    amount: Dinero.Dinero,
    date: Date,
    type: TransactionType,
    entity: string,
    category: string,
    description: string
  ) {
    transaction.amount = amount;
    transaction.date = date;
    transaction.type = type;
    transaction.entity = entity;
    transaction.category = category;
    transaction.description = description;
    this.eventsService.transactionChange.emit();
  }

  fromJson(json: any[], currency: string, account: Account): any[] {
    var results: any[] = [];
    if (json != null) {
      json.forEach((transaction) => {
        results.push(Transaction.fromJson(transaction, account));
      });
    }
    return results;
  }

  /*getReferenceTransaction(account:Account){
    return new Transaction(
      "referenceAccount-"+account.id,
      account.referenceAmount,
      account.referenceDate,
      null,
      null,
      null,
      null,
      account.referenceAmount.toUnit()>0?TransactionType.CREDIT:TransactionType.DEBIT
    );
  }*/

  getSelectedAccountsTransactions(): Transaction[] {
    var accounts: Account[] = this.accountService.getSelectedAccounts();
    return this.getTransactions(accounts);
  }

  getTransactions(accounts: Account[]): Transaction[] {
    var transactions: Transaction[] = [];
    accounts.forEach((account) => {
      account.transactions.forEach((transaction) => {
        transactions.push(transaction);
      });
    });
    return transactions;
  }

  getTransaction(account: Account, id: string): Transaction | null {
    var transactions = this.getTransactions([account]);
    for (var i = 0; i != transactions.length; i++) {
      if (transactions[i].id == id) return transactions[i];
    }
    return null;
  }

  public static sortTransactions(transactions: Transaction[]) {
    transactions.sort(TransactionService.compareTransaction);
  }

  public static compareTransaction(a: Transaction, b: Transaction) {
    return b.date.getTime() - a.date.getTime();
  }

  deleteTransactionId(accountId: string, transactionId: string) {
    var account = this.accountService.getAccount(accountId);
    if (account != null) this.deleteTransaction(account, transactionId);
  }

  deleteTransaction(account: Account, transactionId: string) {
    this.accountService.deleteTransactionId(account, transactionId);
  }

  parse(
    data: string,
    lineSeparator: string,
    columnSeparator: string
  ): string[][] {
    //i18n
    var lines = data.split(lineSeparator);
    if (lines.length > 0 && lines[0].trim().length > 0) {
      var firstRow = lines[0].split(columnSeparator);
      if (firstRow.length > 3) {
        var parsedData: string[][] = [];
        for (var i = 0; i != lines.length; i++) {
          if (lines[i].trim().length != 0) {
            //ignore empty lines
            var columns: string[] = lines[i].split(columnSeparator);
            if (columns.length != firstRow.length) {
              throw new Error('Not all rows have the same number of columns');
            }
            parsedData.push(columns);
          }
        }
        return parsedData;
      } else {
        throw new Error('There should be at least 3 columns');
      }
    } else {
      throw new Error('Enter some text');
    }
  }
}
