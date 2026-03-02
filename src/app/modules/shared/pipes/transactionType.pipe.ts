import { Pipe, PipeTransform } from '@angular/core';
import { TransactionType } from '../../../models/enums';

@Pipe({
    name: 'transactionType',
    standalone: false
})
export class TransactionTypePipe implements PipeTransform {
  transform(value: string /*| TransactionType*/, args?: any): String {
    var e: TransactionType;
    if (typeof value === 'string') e = value as TransactionType;
    else e = value;
    switch (e) {
      case TransactionType.CREDIT:
        return 'Credit'; //TODO I18n
      case TransactionType.DEBIT:
        return 'Debit';
      case TransactionType.TRANSFER:
        return 'Transfer';
    }
  }
}
