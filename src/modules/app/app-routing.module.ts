import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'content' },
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'accounts', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
  { path: 'transactions', loadChildren: () => import('./modules/transaction/transaction.module').then(m => m.TransactionModule)},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BanknRoutingModule { }