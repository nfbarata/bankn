import { LOCALE_ID, Inject } from '@angular/core';
import { Injectable } from '@angular/core';

import { EventsService } from './events.service';
import { FileService } from './file.service';

import { Bankn } from '../models/bankn';
import { Account } from '../models/account';

import { UUID } from 'angular2-uuid';
import { Category } from '../models/category';
import { Entity } from '../models/entity';
import { AccountService } from './account.service';
import { EntityService } from './entity.service';
import { CategoryService } from './category.service';

@Injectable({ providedIn: 'root' })
export class BanknService {

  private bankn: Bankn | null = null;
  private defaultCountryCode: string = 'null';

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private eventsService: EventsService,
    private fileService: FileService
  ) {
    if (locale != null && locale.split('-').length > 0) {
      this.defaultCountryCode = locale.split('-')[0].toUpperCase();
    }
    console.log('default countryCode: ' + this.defaultCountryCode);
  }

  initialized(): boolean {
    return this.bankn != null;
  }

  setBankn(bankn: Bankn) {
    this.clear();
    this.bankn = bankn;
    this.eventsService.emitBanknChange();
    this.eventsService.emitAccountsChange();
    this.eventsService.emitAccountSelectionChange();
    this.eventsService.emitCategoriesChange();
    this.eventsService.emitEntitiesChange();
  }

  static createBankn(name: string, referenceCountry: string): Bankn {
    return new Bankn(UUID.UUID(), name, referenceCountry);
  }

  getBankn(): Bankn | null {
    return this.bankn;
  }

  loadFromFile(): void {
    this.fileService.parseJsonFile((bankn: Bankn) => {
      this.clear();
      this.setBankn(BanknService.fromJson(bankn));
      this.eventsService.emitBanknChange();
      this.eventsService.emitAccountsChange();
      this.eventsService.emitAccountSelectionChange();
      this.eventsService.emitCategoriesChange();
      this.eventsService.emitEntitiesChange();
    });
  }

  saveToFile(): void {
    if (this.bankn != null)
      this.fileService.downloadJsonFile(BanknService.toJson(this.bankn));
    else console.error('No bankn');
  }

  update(name: string, referenceCountry: string): void {
    if (this.bankn != null) {
      this.bankn.name = name;
      this.bankn.referenceCountry = referenceCountry;
      this.eventsService.emitBanknChange();
    }
  }

  private clear(): void {
    if (this.bankn != null) {
      //(necessary? quickly...)
      if (this.bankn.accounts != null) {
        while (this.bankn.accounts.length > 0) {
          while (this.bankn.accounts[0].transactions.length > 0) {
            this.bankn.accounts[0].transactions.pop();
          }
          this.bankn.accounts.pop();
        }
      }
      if (this.bankn.categories != null) {
        while (this.bankn.categories.length > 0) {
          while (this.bankn.categories[0].innerCategories.length > 0) {
            this.bankn.categories[0].innerCategories.pop();
          }
          this.bankn.categories.pop();
        }
      }
      if (this.bankn.entities != null) {
        while (this.bankn.entities.length > 0) {
          this.bankn.entities.pop();
        }
      }
    }
  }

  addAccount(account: Account): void {
    if (this.bankn != null) {
      this.bankn.accounts.push(account);
      this.eventsService.accountsChange.emit();
    }
  }

  deleteAccountId(accountId: string) {
    if (this.bankn != null) {
      this.bankn.accounts = this.bankn.accounts.filter(function (account) {
        return account.id != accountId;
      });
      this.eventsService.accountsChange.emit();
    }
  }

  addCategory(category: Category): void {
    if (this.bankn != null) {
      this.bankn.categories.push(category);
      this.eventsService.categoriesChange.emit();
    }
  }

  addEntity(entity: Entity): void {
    if (this.bankn != null) {
      this.bankn.entities.push(entity);
      this.eventsService.entitiesChange.emit();
    }
  }

  getAccounts(): Account[] {
    if (this.bankn == null) return [];
    return this.bankn.accounts;
  }

  getEntities(): Entity[] {
    if (this.bankn == null) return [];
    return this.bankn.entities;
  }

  getCategories(): Category[] {
    if (this.bankn == null) return [];
    return this.bankn.categories;
  }

  getDefaultCountryCode(): string {
    return this.defaultCountryCode;
  }

  getReferenceCountry(): string {
    if (this.bankn != null) {
      return this.bankn.referenceCountry;
    }
    return this.getDefaultCountryCode();
  }

  public static toJson(bankn: Bankn): any {
    var accountsJson: any[] = [];
    bankn.accounts.forEach((account) => {
      accountsJson.push(AccountService.toJson(account));
    });
    var entitiesJson: any[] = [];
    bankn.entities.forEach((entity) => {
      entitiesJson.push(EntityService.toJson(entity));
    });
    var categoriesJson: any[] = [];
    bankn.categories.forEach((category) => {
      categoriesJson.push(CategoryService.toJson(category));
    });
    return {
      _id: bankn.id,
      name: bankn.name,
      accounts: accountsJson,
      referenceCountry: bankn.referenceCountry,
      entities: entitiesJson,
      categories: categoriesJson,
    };
  }

  public static fromJson(json: any): Bankn {
    var bankn = new Bankn(
      json._id,
      json.name,
      json.referenceCountry,
    );

    if (json.categories)
      for(var category of json.categories)
        bankn.categories.push(CategoryService.fromJson(category));

    var allCategories = CategoryService.getAllCategories(bankn);
    if (json.entities)
      for(var entity of json.entities)
        bankn.entities.push(EntityService.fromJson(entity, allCategories));

    if (json.accounts)
      json.accounts.forEach((account: any) => {
        bankn.accounts.push(AccountService.fromJson(account, bankn));
      });

    return bankn;
  }

}
