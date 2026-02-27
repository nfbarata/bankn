import { Account } from './account';
import { TransactionType } from './enums';
import { Entity } from './entity';
import { Category } from './category';
import { Bankn } from './bankn';
import { Dinero } from 'dinero.js';
import { MathService } from '../services/math.service';

export class Transaction {

  private _id: string; //uuid
  public type: TransactionType;
  public date: Date;
  public amount: Dinero<number>;

  public entity?: Entity;
  public category?: Category;
  public receiptReference?: string;
  public description?: string;
  public transferAccount?: Account;

  //
  //Volatile:
  //
  public hide: boolean = false;
  public account!: Account;
  public balanceBefore: Dinero<number> | null = null;
  public balanceAfter: Dinero<number> | null = null;

  constructor(
    uuid: string,
    amount: Dinero<number>,
    type: TransactionType,
    date: Date = new Date(),
    entity?: Entity,
    category?: Category,
    receiptReference?: string,
    description?: string,
    account: Account | null = null
  ) {
    this._id = uuid;
    this.amount = amount;
    this.type = type;
    this.date = date;
    this.entity = entity;
    this.category = category;
    this.receiptReference = receiptReference;
    this.description = description;
    if (account != null) this.account = account;
  }

  public get id(): string {
    return this._id;
  }
}
