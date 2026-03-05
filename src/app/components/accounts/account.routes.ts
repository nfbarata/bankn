import { Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountListComponent } from './account-list.component';

export const ACCOUNT_ROUTES: Routes = [
  { path: '', component: AccountListComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/:accountId', component: AccountComponent },
];
