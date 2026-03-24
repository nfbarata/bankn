import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializedGuard } from './guards/initialized.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'bankn',
    loadChildren: () => import('./components/bankn/bankn.routes').then((m) => m.BANKN_ROUTES),
  },
  {
    path: 'accounts',
    loadChildren: () => import('./components/accounts/account.routes').then((m) => m.ACCOUNT_ROUTES),
    canActivate: [InitializedGuard],
  },
  {
    path: 'transactions',
    loadChildren: () => import('./components/transactions/transaction.routes').then((m) => m.TRANSACTION_ROUTES),
    canActivate: [InitializedGuard],
  },
  {
    path: 'charts',
    loadChildren: () => import('./components/charts/chart.routes').then((m) => m.CHART_ROUTES),
    canActivate: [InitializedGuard],
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/categories/category.routes').then((m) => m.CATEGORY_ROUTES),
    canActivate: [InitializedGuard],
  },
  {
    path: 'entities',
    loadChildren: () => import('./components/entities/entity.routes').then((m) => m.ENTITY_ROUTES),
    canActivate: [InitializedGuard],
  },
  { path: '**', redirectTo: '' }, // or show a “not found” page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
