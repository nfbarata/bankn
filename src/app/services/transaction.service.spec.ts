import { TestBed } from '@angular/core/testing';
import { Account } from '../models/account';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { Entity } from '../models/entity';
import { TransactionType } from '../models/enums';
import { AccountService } from './account.service';
import { BanknService } from './bankn.service';
import { TransactionService } from './transaction.service';
import { dinero, toDecimal } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';

describe('TransactionService', () => {

    let service: TransactionService;
    //let banknServiceMock: jasmine.SpyObj<BanknService>;

  beforeEach(() => {
      //banknServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({
      imports: [ ],
      declarations: [],
      providers: [
        //  {provide: BanknService, useValue: banknServiceMock}
      ]
    }).compileComponents();
    service = TestBed.inject(TransactionService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should process fromJson', () => {
    var id = "testId";
    var amount = 0;
    var date = "2020-01-01"
    var entityName = "ent";
    var categoryName = "cat";
    var receiptReference = "rec"
    var description = "desc";
    var type = TransactionType.CREDIT;

    var bankn = new Bankn("id","teste","");

    var category = new Category(categoryName);
    bankn.categories.push(category);

    var entity = new Entity(entityName);
    entity.referenceCategory = category;
    bankn.entities.push(entity);

    var account = new Account(
      "id",
      "name",
      "des",
      dinero({ amount: 0, currency: EUR }),
      new Date(),
      "PT"
    );
    bankn.accounts.push(account);

    var transaction = TransactionService.fromJson({
      _id: id,
      amount: amount,
      type: type,
      date: date,
      entity: entity.id,
      category: category.id,
      receiptReference: receiptReference,
      description: description,
    }, account, bankn);
    expect(transaction.id).toBe(id);
    expect(transaction.amount.toJSON().amount).toEqual(amount);
    expect(transaction.type).toBe(type);
    expect(transaction.date).toEqual(new Date(date));
    expect(transaction.entity?.name).toBe(entityName);
    expect(transaction.category?.name).toBe(categoryName);
    expect(transaction.receiptReference).toBe(receiptReference);
    expect(transaction.description).toBe(description);
  });
});
