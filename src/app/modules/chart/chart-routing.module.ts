import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartListComponent } from './components/chart-list/chart-list.component';

const routes: Routes = [
  { path: '', component: ChartListComponent },
  //{ path: 'transaction', component: TransactionComponent },
  //{ path: ':accountId', component: TransactionListComponent },
  //{ path: 'transaction/:accountId', component: TransactionComponent },
  //{ path: 'transaction/:accountId/:transactionId', component: TransactionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {}
