import { TestBed } from '@angular/core/testing';
import { dinero, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from '../models/account';
import { TransactionType } from '../models/enums';
import { Transaction } from '../models/transaction';
import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
import { EventsService } from './events.service';
import { MathService } from './math.service';
import { Bankn } from '../models/bankn';
import { UtilsService } from './utils.service';

describe('AccountService', () => {

  let service: AccountService;
  let banknServiceMock: any;
  let mathServiceMock: any;

  beforeEach(() => {
    banknServiceMock = {
      _addAccount: jest.fn(),
      getAccounts: jest.fn().mockReturnValue([]),
      getBankn: jest.fn().mockReturnValue({ transactionsStartDate: new Date() }),
      _deleteAccount: jest.fn(),
    };

    mathServiceMock = {
      toCurrency: jest.fn().mockReturnValue(EUR),
      toDinero: jest.fn(value => {
        return dinero({
          amount: value,
          currency: EUR,
        });
      })
    };

    TestBed.configureTestingModule({
        providers: [
            AccountService,
            { provide: BanknService, useValue: banknServiceMock },
            { provide: EventsService, useValue: {
                emitAccountsChange: jest.fn(),
                emitAccountSelectionChange: jest.fn(),
                emitTransactionChange: jest.fn(),
                emitAccountTransactionsChange: jest.fn()
            } },
            { provide: MathService, useValue: mathServiceMock }
        ]
    });
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createAccount works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    expect(banknServiceMock._addAccount).toHaveBeenCalled();
    expect(account.id).toBeDefined();
  });

  it('addTransaction deleteTransaction works', () => {
    var account = service.createAccount("teste", "teste", new Date(), "PT");
    var transaction = new Transaction("teste", dinero({ amount: 0, currency: EUR }), TransactionType.DEBIT);
    service.addTransaction(account, transaction);
    expect(account.transactions.length).toBe(1);
    expect(transaction.account.id).toBe(account.id);
    service.deleteTransaction(account, transaction.id);
    expect(account.transactions.length).toBe(0);
  });

  it('getInitialValue works', () => {
    var account = service.createAccount("a1", "teste", new Date(), "PT", dinero({ amount: 3000, currency: EUR }));
    expect(toDecimal(AccountService.getInitialValue(account))).toBe("30.00");

    var transaction = new Transaction("t1", dinero({ amount: 1100, currency: EUR }), TransactionType.CREDIT, UtilsService.removeDays(account.referenceDate, 1));
    service.addTransaction(account, transaction);
    service.addTransaction(account, new Transaction("t2", dinero({ amount: 100, currency: EUR }), TransactionType.DEBIT, UtilsService.removeDays(account.referenceDate, 2)));
    expect(toDecimal(AccountService.getInitialValue(account))).toBe("20.00");

    service.addTransaction(account, new Transaction("t3", dinero({ amount: 500, currency: EUR }), TransactionType.DEBIT, UtilsService.removeDays(account.referenceDate, 10)));
    service.addTransaction(account, new Transaction("t4", dinero({ amount: 700, currency: EUR }), TransactionType.CREDIT, UtilsService.addDays(account.referenceDate, 1)));
    expect(toDecimal(AccountService.getInitialValue(account))).toBe("25.00");

    service.deleteTransaction(account, transaction.id);
    expect(toDecimal(AccountService.getInitialValue(account))).toBe("36.00");
  });

  it('getInitialValueMultiple works', () => {
    var accounts: Account[] = [];
    var account = service.createAccount("a1", "teste", new Date(), "PT", dinero({ amount: 3000, currency: EUR }));
    accounts.push(account);
    var account2 = service.createAccount("a2", "teste", UtilsService.removeDays(account.referenceDate, 10), "PT", dinero({ amount: 10000, currency: EUR }));
    accounts.push(account2);

    var balance = service.getInitialValueMultiple(accounts);
    expect(toDecimal(balance)).toBe("130.00");

    service.addTransaction(account, new Transaction("t1", dinero({ amount: 1000, currency: EUR }), TransactionType.CREDIT, UtilsService.removeDays(account.referenceDate, 5)));
    balance = service.getInitialValueMultiple(accounts);
    expect(toDecimal(balance)).toBe("120.00");
  });

  it('getInitialValueForCurrentPeriod works', () => {

    var account = service.createAccount("teste", "teste", new Date(), "PT", dinero({ amount: 10000, currency: EUR }));
    service.addTransaction(account, new Transaction("teste", dinero({ amount: 1100, currency: EUR }), TransactionType.CREDIT, new Date(2000, 0, 1)));
    service.addTransaction(account, new Transaction("teste", dinero({ amount: 100, currency: EUR }), TransactionType.DEBIT, new Date(2000, 0, 2)));
    service.addTransaction(account, new Transaction("teste", dinero({ amount: 2200, currency: EUR }), TransactionType.CREDIT, UtilsService.addDays(account.referenceDate, 10)));
    service.addTransaction(account, new Transaction("teste", dinero({ amount: 200, currency: EUR }), TransactionType.DEBIT, UtilsService.addDays(account.referenceDate, 11)));

    expect(toDecimal(AccountService.getInitialValueForCurrentPeriod(account, account.referenceDate))).toBe("100.00");
    expect(toDecimal(AccountService.getInitialValueForCurrentPeriod(account, new Date(1999, 0, 1)))).toBe("90.00");
    expect(toDecimal(AccountService.getInitialValueForCurrentPeriod(account, UtilsService.addDays(account.referenceDate, 20)))).toBe("120.00");
  });

  it('should process fromJson', () => {
    var id = "testId";
    var name = "name";
    var description = "desc";
    var referenceAmount = "0.00";
    var referenceDate = "2020-01-01"
    var referenceCountry = "PT";

    var bankn = new Bankn("id", "name", "PT");

    //no transactions
    var account = AccountService.fromJson({
      _id: id,
      name: name,
      description: description,
      referenceAmount: referenceAmount,
      referenceDate: referenceDate,
      referenceCountry: referenceCountry
    }, bankn);
    expect(account.id).toBe(id);
    expect(account.name).toBe(name);
    expect(account.description).toBe(description);
    expect(toDecimal(account.referenceAmount)).toEqual(referenceAmount);
    expect(account.referenceDate).toEqual(new Date(referenceDate));
    expect(account.referenceCountry).toBe(referenceCountry);
    expect(account.transactions.length).toBe(0);
    expect(account.selected).toBeFalsy();

    //with transactions
    account = AccountService.fromJson({
      _id: id,
      name: name,
      description: description,
      referenceAmount: referenceAmount,
      referenceDate: referenceDate,
      referenceCountry: referenceCountry,
      transactions: [{
        _id: "1",
        amount: "0",
        date: "2022-01-01",
        entity: "",
        category: "",
        description: "",
        type: TransactionType.CREDIT,
      }, {
        _id: "2",
        amount: "0",
        date: "2022-01-01",
        entity: "",
        category: "",
        description: "",
        type: TransactionType.CREDIT,
      }],
      selected: true
    }, bankn);
    expect(account.id).toBe(id);
    expect(account.name).toBe(name);
    expect(account.description).toBe(description);
    expect(toDecimal(account.referenceAmount)).toEqual(referenceAmount);
    expect(account.referenceDate).toEqual(new Date(referenceDate));
    expect(account.referenceCountry).toBe(referenceCountry);
    expect(account.transactions.length).toBe(2);
    expect(account.transactions[0].id).toBe("1");
    expect(account.transactions[1].id).toBe("2");
    expect(account.selected).toBeTruthy();
  });
});
