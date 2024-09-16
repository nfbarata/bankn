import { Transaction } from './transaction';
import { ColumnSeparator, RowSeparator } from './enums';
import { Bankn } from './bankn';
import { Dinero } from 'dinero.js';
import { MathService } from '../services/math.service';

export class Account {
  private _id: string;
  name: string;
  description: string;

  transactions: Transaction[];

  //TODO type
  //TOOD arquived
  //TODO exclude orçamentos
  selected: boolean;

  //
  // From where balance is calculated
  //
  referenceAmount: Dinero<number>; //currency; inside referenceAmount
  referenceCountry: string; //to select in edit
  referenceDate: Date;

  columnSeparator: ColumnSeparator;
  customColumnSeparator: string | null;
  rowSeparator: RowSeparator;
  customRowSeparator: string | null;

  constructor(
    id: string,
    name: string,
    description: string = '',
    referenceAmount: Dinero<number>,
    referenceDate: Date,
    referenceCountry: string,
    transactions: Transaction[] = [],
    selected: boolean = false,
    columnSeparator: ColumnSeparator = ColumnSeparator.TAB,
    customColumnSeparator: string | null = null,
    rowSeparator: RowSeparator = RowSeparator.NEWLINE,
    customRowSeparator: string | null = null
  ) {
    this._id = id;
    this.name = name;
    this.description = description;
    this.referenceAmount = referenceAmount;
    this.referenceDate = referenceDate;
    this.referenceCountry = referenceCountry;
    if (transactions == null) this.transactions = [];
    else this.transactions = transactions;
    this.selected = selected;
    this.columnSeparator = columnSeparator;
    this.rowSeparator = rowSeparator;
    this.customColumnSeparator = customColumnSeparator;
    this.customRowSeparator = customRowSeparator;
  }

  public get id(): string {
    return this._id;
  }
}
