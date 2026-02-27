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

  constructor(
    id: string,
    name: string,
    referenceCountry: string,
    accounts: Account[] = [],
    categories: Category[] = [],
    entities: Entity[] = []
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
  }

  public get id(): string {
    return this._id;
  }
}
