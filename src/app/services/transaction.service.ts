import { Injectable, Inject } from "@angular/core";

import { v4 as uuidv4 } from "uuid";

import { EventsService } from "./events.service";
import { AccountService } from "./account.service";

import { Account } from "../models/account";
import {
  Transaction,
  TransactionType,
  ImportColumnType,
  getTransactionType
} from "../models/transaction";
import Dinero from "dinero.js";

@Injectable({ providedIn: "root" })
export class TransactionService {
  importTransactions = []; //volatile
  filterTransactions = []; //volatile
  filterActions = []; //volatile

  constructor(
    private eventsService: EventsService,
    private accountService: AccountService
  ) {}

  createTransaction(
    account: Account,
    amount: Dinero.Dinero,
    date: Date,
    type,
    entity: string,
    category: string,
    description: string
  ) {
    var clearDate = new Date(0); //clear hours/minutes/seconds
    clearDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    var transaction = new Transaction(
      uuidv4(),
      amount,
      clearDate,
      entity,
      category,
      description,
      type
    );
    this.accountService.addTransaction(account, transaction);
  }

  updateTransaction(
    account: Account,
    transaction: Transaction,
    amount: Dinero.Dinero,
    date: Date,
    type,
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

  toJson(transactions: Transaction[]) {
    var results = [];
    transactions.forEach(transaction => {
      results.push({
        id: transaction.getId(),
        amount: transaction.amount.toUnit(), //Dinero to value, compacted result
        date: transaction.date.toISOString().substring(0, 10),
        entity: transaction.entity,
        category: transaction.category,
        description: transaction.description,
        type: transaction.type.id
      });
    });
    return results;
  }

  fromJson(json: any[], currency: string, accountId: string) {
    var results = [];
    if (json != null) {
      json.forEach(transaction => {
        var newTransaction = new Transaction(
          transaction.id,
          this.accountService.toDinero(currency, transaction.amount), //value to Dinero, speed
          new Date(transaction.date),
          typeof transaction.entity === "undefined" ? null : transaction.entity,
          typeof transaction.category === "undefined"
            ? null
            : transaction.category,
          transaction.description,
          getTransactionType(transaction.type)
        );
        newTransaction.accountId = accountId;
        results.push(newTransaction);
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
    accounts.forEach(account => {
      account.transactions.forEach(transaction => {
        transactions.push(transaction);
      });
    });
    return transactions;
  }

  getTransaction(account: Account, id: string) {
    var transactions = this.getTransactions([account]);
    for (var i = 0; i != transactions.length; i++) {
      if (transactions[i].getId() == id) return transactions[i];
    }
  }

  sortTransactions(transactions: Transaction[]) {
    return transactions.sort(this.compareTransaction);
  }

  compareTransaction(a: Transaction, b: Transaction) {
    return b.date.getTime() - a.date.getTime();
  }

  deleteTransactionId(accountId: string, transactionId: string) {
    var account = this.accountService.getAccount(accountId);
    this.deleteTransaction(account, transactionId);
  }

  deleteTransaction(account: Account, transactionId: string) {
    this.accountService.deleteTransactionId(account, transactionId);
  }

  parse(data: string, lineSeparator: string, columnSeparator: string): any {
    //i18n
    var lines = data.split(lineSeparator);
    if (lines.length > 0 && lines[0].trim().length > 0) {
      var firstRow = lines[0].split(columnSeparator);
      if (firstRow.length > 3) {
        var parsedData = [];
        for (var i = 0; i != lines.length; i++) {
          if (lines[i].trim().length != 0) {
            //ignore empty lines
            var columns = lines[i].split(columnSeparator);
            if (columns.length != firstRow.length) {
              throw new Error("Not all rows have the same number of columns");
            }
            parsedData.push(columns);
          }
        }
        return parsedData;
      } else {
        throw new Error("There should be at least 3 columns");
      }
    } else {
      throw new Error("Enter some text");
    }
  }
}
