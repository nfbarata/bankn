import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './account-routing.module'
import { SharedModule } from '../shared/shared.module';

import { AccountComponent } from './components/account/account.component';
import { AccountListComponent } from './components/account-list/account-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        AccountsRoutingModule,
        SharedModule,
        AccountComponent,
        AccountListComponent
    ],
    exports: []
})
export class AccountModule { 
  
}