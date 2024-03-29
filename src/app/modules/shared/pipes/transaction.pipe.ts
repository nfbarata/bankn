import { Pipe, PipeTransform } from '@angular/core';
import { DineroPipe } from './dinero.pipe';
import { Transaction } from '../../../models/transaction';
import { TransactionType } from '../../../models/enums';
import { dinero, toDecimal, compare  } from 'dinero.js';

@Pipe({
  name: 'transaction',
})
export class TransactionPipe implements PipeTransform {
  constructor(private dinero: DineroPipe) {}

  transform(transaction: Transaction, args?: any): any {
    var amount = transaction.amount;
    var result = '';
    switch (transaction.type) {
      case TransactionType.CREDIT:
        break;
      case TransactionType.DEBIT:
        if (compare(amount, dinero({amount: 0,currency: amount.toJSON().currency}))==1) 
          result = result + '-';
        break;
    }
    result = result + this.dinero.transform(amount);
    return result;
  }
}
