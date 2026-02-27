import { TestBed } from '@angular/core/testing';
import { dinero } from 'dinero.js';
import { EUR } from '@dinero.js/currencies';
import { Account } from '../models/account';
import { Entity } from '../models/entity';
import { BanknService } from './bankn.service';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';

describe('BanknService', () => {

  let service: BanknService;
  let account: Account = new Account("teste","teste","desc",dinero({amount:0,currency:EUR}),new Date(),"PT");

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [],
      providers: [
      ]
    }).compileComponents();
    service = TestBed.inject(BanknService);
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('initialized works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.initialized()).toBeTrue();
  });

  it('addAccount, getAccounts and deleteAccountId works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    expect(service.getAccounts().length).toBe(0);
    expect(service.getBankn()!.accounts.length).toBe(0);
    service.addAccount(account);
    expect(service.getAccounts().length).toBe(1);
    expect(service.getBankn()!.accounts.length).toBe(1);
    service.deleteAccountId(account.id);
    expect(service.getAccounts().length).toBe(0);
    expect(service.getBankn()!.accounts.length).toBe(0);
  });


  it('addNewPattern works', () => {
    expect(service.initialized()).toBeFalse();
    let bankn = BanknService.createBankn("test","PT");
    service.setBankn(bankn);
    var ent = new Entity("name");
    service.getBankn()?.entities.push(ent);
  });

  it('should process fromJson', () => {
    var id = "testId";
    var name = "name";
    var referenceCountry = "PT";

    //no optional fields
    var bankn = BanknService.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(0);

    //with optional fields
    bankn = BanknService.fromJson({
      id: id,
      name: name,
      referenceCountry: referenceCountry,
      entities: [{
        name: "ent",
      }, {
        name: "ent2",
      }],
      categories: [{
        name: "cat",
      }, {
        name: "cat2",
      }],
      accounts: [{
        id: "1",
        name: "ac1",
        description: "",
        referenceAmount: 1.00,
        referenceDate: "2020-01-01",
        referenceCountry: referenceCountry,
        selected: false,
      }, {
        id: "2",
        name: "ac2",
        description: "",
        referenceAmount: 2.00,
        referenceDate: "2020-01-01",
        referenceCountry: referenceCountry,
        selected: false,
      }]
    });
    expect(bankn.id).toBe(id);
    expect(bankn.name).toBe(name);
    expect(bankn.referenceCountry).toBe(referenceCountry);
    expect(bankn.accounts.length).toBe(2);
    expect(bankn.accounts[0].id).toBe("1");
    expect(bankn.accounts[1].id).toBe("2");
    expect(bankn.entities.length).toBe(2);
    expect(bankn.entities[0].name).toBe("ent");
    expect(bankn.categories.length).toBe(2);
    expect(bankn.categories[0].name).toBe("cat");
  });

  it('addCategory works', () => {
    let bankn = new Bankn("", "", "");
    service.setBankn(bankn);
    expect(bankn.categories.length).toBe(0);
    service.addCategory(new Category("cat"));
    expect(bankn.categories.length).toBe(1);
    service.addCategory(new Category("cat"));
    expect(bankn.categories.length).toBe(2);
    service.addCategory(new Category("cat2"));
    expect(bankn.categories.length).toBe(3);
  });

  it('addEntity works', () => {
    let bankn = new Bankn("","","");
    service.setBankn(bankn);
    expect(bankn.entities.length).toBe(0);
    service.addEntity(new Entity("ent"));
    expect(bankn.entities.length).toBe(1);
    service.addEntity(new Entity("ent"));
    expect(bankn.entities.length).toBe(2);
    service.addEntity(new Entity("ent2"));
    expect(bankn.entities.length).toBe(3);
  });
});
