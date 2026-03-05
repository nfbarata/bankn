import { Pipe, PipeTransform } from '@angular/core';
import { ImportColumnType } from '../models/enums';

@Pipe({ name: 'importColumnType' })
@Injectable({ providedIn: 'root' })
export class ImportColumnTypePipe implements PipeTransform {
  transform(value: string /*| ImportColumnType*/, args?: any): String {
    var e: ImportColumnType;
    if (typeof value === 'string') e = value as ImportColumnType;
    else e = value;
    switch (e) {
      case ImportColumnType.IGNORE:
        return 'Ignore'; //TODO i18n
      case ImportColumnType.DESCRIPTION:
        return 'Description';
      case ImportColumnType.DATE_DMY:
        return 'Date (Day Month Year)';
      case ImportColumnType.DATE_MDY:
        return 'Date (Month Day Year)';
      case ImportColumnType.DATE_YMD:
        return 'Date (Year Month Day)';
      case ImportColumnType.AMOUNT:
        return 'Amount';
      case ImportColumnType.CREDIT:
        return 'Credit';
      case ImportColumnType.DEBIT:
        return 'Debit';
      case ImportColumnType.SIGN:
        return 'Sign';
    } return '';
  }
}
