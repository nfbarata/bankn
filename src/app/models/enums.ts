export enum TransactionType {
  CREDIT = 'c',
  DEBIT = 'd',
  // TODO TRANSFER = 't',
}

export enum ImportColumnType {
  IGNORE = 'i', //'Ignore',
  DESCRIPTION = 'des', // 'Description',
  DATE_DMY = 'dtdmy', // 'Date (Day Month Year)',
  DATE_MDY = 'dtmdy', // 'Date (Month Day Year)',
  DATE_YMD = 'dtymd', // 'Date (Year Month Day)',
  AMOUNT = 'a', // 'Amount',
  CREDIT = 'c', // 'Credit',
  DEBIT = 'd', // 'Debit',
  SIGN = 's', // 'Sign',
}

export enum ColumnSeparator {
  TAB = '9',
  COMMA = '44',
  SEMCOLON = '59',
  SPACE = '32',
  CUSTOM = '',
}

export enum RowSeparator {
  NEWLINE = '10',
  CUSTOM = '',
}
