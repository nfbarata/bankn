import { Injectable } from '@angular/core';

import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { Account } from '../models/account';

import { Transaction } from '../models/transaction';

//import Dinero from 'dinero.js';
import { Dinero, Currency, add, subtract } from 'dinero.js';
import { TransactionService } from './transaction.service';
import { TransactionType } from '../models/enums';
import { MathService } from './math.service';
import { Bankn } from '../models/bankn';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    private banknService: BanknService,
    private eventsService: EventsService,
    private mathService: MathService
  ) { }

  createAccount(
    name: string,
    description: string,
    referenceDate: Date,
    referenceCountry: string,
    referenceAmount?: Dinero<number>
  ): Account {
    var account: Account = new Account(
      this.createId(),
      name,
      description,
      referenceAmount === undefined ? this.toDinero(0, null) : referenceAmount,
      referenceDate,
      referenceCountry,
      [],
      true
    );
    this.banknService.addAccount(account);
    return account;
  }

  updateAccount(
    id: string,
    name: string,
    description: string,
    referenceAmount: Dinero<number>,
    referenceDate: Date,
    referenceCountry: string
  ) {
    var account: Account | null = this.getAccount(id);
    if (account != null) {
      account.name = name;
      account.description = description;
      account.referenceAmount = referenceAmount;
      account.referenceDate = referenceDate;
      account.referenceCountry = referenceCountry;
      this.eventsService.emitAccountsChange();
    }
  }

  private createId(): string {
    //return uuid();
    var accounts: Account[] = this.getAccounts();
    var accountIds: string[] = [];
    for (let i = 0; i < accounts.length; i++) {
      accountIds.push(accounts[i].id);
    }
    accountIds = accountIds.sort((a: string, b: string): any => {
      return Number(a) - Number(b);
    });
    let i;
    for (i = 0; i < accountIds.length; i++) {
      if (accountIds[i].localeCompare(i + '') != 0) {
        //console.log(i);
        return i + '';
      }
    }
    return i + '';
  }

  deleteAccountId(accountId: string) {
    this.banknService.deleteAccountId(accountId);
  }

  deleteAccount(account: Account) {
    this.deleteAccountId(account.id);
  }

  getAccounts(): Account[] {
    return this.banknService.getAccounts();
  }

  getAccount(accountId: string): Account | null {
    var accounts: Account[] = this.getAccounts();
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i].id == accountId) return accounts[i];
    }
    console.error('account not found:' + accountId);
    return null;
  }

  getSelectedAccounts(): Account[] {
    var accounts: Account[] = [];
    this.banknService.getAccounts().forEach((account) => {
      if (account.selected) accounts.push(account);
    });
    return accounts;
  }

  toggleAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.toggleAccount(account);
  }

  toggleAccount(account: Account) {
    if (account.selected) this.unselectAccount(account);
    else this.selectAccount(account);
  }

  selectAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.selectAccount(account);
  }

  selectAccount(account: Account) {
    if (!account.selected) {
      account.selected = true;
      this.eventsService.emitAccountSelectionChange();
    }
  }

  unselectAccountId(accountId: string) {
    var account: Account | null = this.getAccount(accountId);
    if (account != null) this.unselectAccount(account);
  }

  unselectAccount(account: Account) {
    if (account.selected) {
      account.selected = false;
      this.eventsService.emitAccountSelectionChange();
    }
  }

  addTransaction(account: Account, transaction: Transaction) {
    transaction.account = account;
    account.transactions.push(transaction); //TODO try to optimize and don't need to sort
    TransactionService.sortTransactions(account.transactions);
    this.eventsService.emitAccountTransactionsChange();
  }

  getCurrentPeriodTransactions(account: Account) {
    var bankn = this.banknService.getBankn()!;
    return account.transactions.filter(transaction => {
      const afterStartDate = !bankn.transactionsStartDate || transaction.date >= bankn.transactionsStartDate;
      const beforeEndDate = !bankn.transactionsEndDate || transaction.date <= bankn.transactionsEndDate;
      return afterStartDate && beforeEndDate;
    });
  }

  deleteTransactionId(account: Account, transactionId: string) {
    account.transactions = account.transactions.filter(function (transaction) {
      return transaction.id != transactionId;
    });
    this.eventsService.emitTransactionChange();
    this.eventsService.emitAccountTransactionsChange();
  }

  static getInitialValue(account: Account): Dinero<number> {
    var initialValue = account.referenceAmount;

    for (let i = account.transactions.length - 1; i >= 0; i--) {
      if (account.transactions[i].date.getTime() < account.referenceDate.getTime()) {
        switch (account.transactions[i].type) {
          case TransactionType.CREDIT:
            initialValue = subtract(initialValue, account.transactions[i].amount);
            break;
          case TransactionType.DEBIT:
            initialValue = add(initialValue, account.transactions[i].amount);
            break;
        }
      } else {
        // optimization (transactions are ordered)
        break;
      }
    }
    return initialValue;
  }

  static getInitialValueForCurrentPeriod(account: Account, startTime: Date): Dinero<number> {
    var initialValue = AccountService.getInitialValue(account);

    for (let i = account.transactions.length - 1; i >= 0; i--) {
      if (account.transactions[i].date.getTime() < startTime.getTime()) {
        switch (account.transactions[i].type) {
          case TransactionType.DEBIT:
            initialValue = subtract(initialValue, account.transactions[i].amount);
            break;
          case TransactionType.CREDIT:
            initialValue = add(initialValue, account.transactions[i].amount);
            break;
        }
      } else {
        // optimization (transactions are ordered)
        break;
      }
    }
    return initialValue;
  }

  getInitialValueMultiple(accounts: Account[]): Dinero<number> {
    var initialBalance = this.toDinero(0, accounts[0]);//TODO dif currencies
    accounts.forEach((account) => {
      initialBalance = add(initialBalance, AccountService.getInitialValue(account));
    });
    return initialBalance;
  }

  getInitialValueMultipleForCurrentPeriod(accounts: Account[]): Dinero<number> {
    var initialBalance = this.toDinero(0, accounts[0]);//TODO dif currencies
    accounts.forEach((account) => {
      initialBalance = add(
        initialBalance,
        this.banknService.getBankn()!.transactionsStartDate ?
          AccountService.getInitialValueForCurrentPeriod(account, this.banknService.getBankn()!.transactionsStartDate!) :
          AccountService.getInitialValue(account)
      );
    });
    return initialBalance;
  }

  public toDinero(amount: number, account: Account | null): Dinero<number> {
    return this.mathService.toDinero(amount, this.getCurrency(account));
  }

  public getCurrency(account: Account | null = null): Currency<number> {
    return account != null
      ? account.referenceAmount.toJSON().currency
      : this.mathService.toCurrency();
  }

  fromInputValue(number: string, account: Account): Dinero<number> {
    return MathService.fromInputValue(number, account.referenceCountry);
  }

  public static toJson(account: Account): any {
    var transactionsJson: any[] = [];
    account.transactions.forEach((transaction) => {
      transactionsJson.push(TransactionService.toJson(transaction));
    });
    return {
      _id: account.id,
      name: account.name,
      description: account.description,
      referenceAmount: account.referenceAmount.toJSON().amount,
      referenceDate: account.referenceDate.toISOString().substring(0, 10),
      referenceCountry: account.referenceCountry,
      transactions: transactionsJson,
      selected: account.selected,
      columnSeparator: account.columnSeparator,
      customColumnSeparator: account.customColumnSeparator,
      rowSeparator: account.columnSeparator,
      customRowSeparator: account.customRowSeparator,
    };
  }

  public static fromJson(json: any, bankn: Bankn): Account {
    var account = new Account(
      json._id,
      json.name,
      json.description,
      MathService.fromInputValue(
        json.referenceAmount,
        json.referenceCountry
      ),
      new Date(json.referenceDate),
      json.referenceCountry,
      [],
      json.selected,
      json.columnSeparator,
      json.customColumnSeparator,
      json.rowSeparator,
      json.customRowSeparator
    );
    if (json.transactions){
      json.transactions.forEach((transaction: any) => {
        account.transactions.push(
          TransactionService.fromJson(transaction, account, bankn)
        );
      });
      TransactionService.sortTransactions(account.transactions);
    }
    // console.log('Parsed account', account);
    return account;
  }

  public getSelectedAccountsCurrency(): Currency<number> {
    var accounts: Account[] = this.getSelectedAccounts();
    if (accounts.length > 0) {
      return this.getCurrency(accounts[0]);
    } else {
      return this.mathService.toCurrency();
    }
  }
}
