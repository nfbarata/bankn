import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionImportComponent } from './components/transaction-import/transaction-import.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionImportFilterComponent } from './components/transaction-import-filter/transaction-import-filter.component';
import { TransactionImportEditComponent } from './components/transaction-import-edit/transaction-import-edit.component'

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        TransactionRoutingModule,
        SharedModule,
        TransactionListComponent,
        TransactionImportComponent,
        TransactionComponent,
        TransactionImportFilterComponent,
        TransactionImportEditComponent
    ],
    exports: [
        TransactionImportComponent, TransactionComponent
    ]
})
export class TransactionModule {
  
}