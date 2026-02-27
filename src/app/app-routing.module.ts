import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializedGuard } from './guards/initialized.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'bankn',
    loadChildren: () =>
      import('./modules/bankn/bankn.module').then((m) => m.BanknModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
    canActivate: [InitializedGuard],
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./modules/transaction/transaction.module').then(
        (m) => m.TransactionModule
      ),
    canActivate: [InitializedGuard],
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./modules/chart/chart.module').then((m) => m.ChartModule),
    canActivate: [InitializedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
