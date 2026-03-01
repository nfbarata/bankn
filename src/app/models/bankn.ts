import { Account } from './account';
import { Category } from './category';
import { Entity } from './entity';

export class Bankn {
  private _id: string;
  name: string;
  accounts: Account[];
  //for default account country
  referenceCountry: string;

  entities: Entity[];
  categories: Category[];

  transactionsStartDate?: Date;
  transactionsEndDate?: Date;

  constructor(
    id: string,
    name: string,
    referenceCountry: string,
    transactionsStartDate: Date = new Date(new Date().getFullYear(), 0, 1),
    transactionsEndDate: Date = new Date(),
    accounts: Account[] = [],
    categories: Category[] = [],
    entities: Entity[] = [],
  ) {
    this._id = id;
    this.name = name;
    if (accounts == null) {
      this.accounts = [];
    } else {
      this.accounts = accounts;
    }
    this.referenceCountry = referenceCountry;
    this.entities = entities;
    this.categories = categories;
    this.transactionsStartDate = transactionsStartDate;
    this.transactionsEndDate = transactionsEndDate;
  }

  public get id(): string {
    return this._id;
  }
}
