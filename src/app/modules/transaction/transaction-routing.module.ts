import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component'
import { TransactionImportComponent } from './components/transaction-import/transaction-import.component'
import { TransactionImportFilterComponent } from './components/transaction-import-filter/transaction-import-filter.component'
import { TransactionImportEditComponent } from './components/transaction-import-edit/transaction-import-edit.component'
import { TransactionComponent } from './components/transaction/transaction.component'

const routes: Routes = [
  { path: '', component: TransactionListComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: ':accountId', component: TransactionListComponent },
  { path: 'transaction/:accountId', component: TransactionComponent },
  { path: 'transaction/:accountId/:transactionId', component: TransactionComponent },
  { path: 'import/:accountId', component: TransactionImportComponent },
  { path: 'import-filter/:accountId', component: TransactionImportFilterComponent },
  { path: 'import-edit/:accountId', component: TransactionImportEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }