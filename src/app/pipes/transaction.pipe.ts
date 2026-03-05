import { Injectable, Pipe, PipeTransform, inject } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/enums';
import { dinero, toDecimal, compare } from 'dinero.js';
import { DineroPipe } from './dinero.pipe';

@Pipe({ name: 'transaction' })
@Injectable({ providedIn: 'root' })
export class TransactionPipe implements PipeTransform {

  private readonly dineroPipe = inject(DineroPipe);

  transform(transaction: Transaction): any {

    var amount = transaction.amount;

    if (amount.toJSON().amount != 0 && transaction.type == TransactionType.DEBIT )
      amount = dinero({
        amount: amount.toJSON().amount * -1,
        currency: amount.toJSON().currency
      });

    return this.dineroPipe.transform(amount);
  }
}