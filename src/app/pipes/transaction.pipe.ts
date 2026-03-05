import { Pipe, PipeTransform, inject } from '@angular/core';
import { Transaction } from '../models/transaction';
import { TransactionType } from '../models/enums';
import { dinero, toDecimal, compare } from 'dinero.js';

@Pipe({ name: 'transaction' })
@Injectable({ providedIn: 'root' })
export class TransactionPipe implements PipeTransform {

  transform(transaction: Transaction): any {

    var amount = transaction.amount;

    if (amount.toJSON().amount == 0)
      return amount;

    switch (transaction.type) {
      case TransactionType.CREDIT:
        return amount;
      case TransactionType.DEBIT:
        return dinero({
          amount: amount.toJSON().amount * -1,
          currency: amount.toJSON().currency
        });
    }
  }
}