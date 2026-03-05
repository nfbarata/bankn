import { Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list.component';
import { TransactionComponent } from './transaction.component';
import { TransactionImportComponent } from './transaction-import.component';
import { TransactionImportFilterComponent } from './transaction-import-filter.component';
import { TransactionImportEditComponent } from './transaction-import-edit.component';

export const TRANSACTION_ROUTES: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: ':accountId', component: TransactionListComponent },
  { path: 'transaction/:accountId', component: TransactionComponent },
  { path: 'transaction/:accountId/:transactionId', component: TransactionComponent },
  { path: 'import/:accountId', component: TransactionImportComponent },
  { path: 'import-filter/:accountId', component: TransactionImportFilterComponent },
  { path: 'import-edit/:accountId', component: TransactionImportEditComponent },
];
