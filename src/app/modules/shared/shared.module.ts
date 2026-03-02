import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountSelectCardComponent } from './components/account-select-card/account-select-card.component';
import { AccountCreateCardComponent } from './components/account-create-card/account-create-card.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FileOpenCardComponent } from './components/file-open-card/file-open-card.component';
import { BanknCreateCardComponent } from './components/bankn-create-card/bankn-create-card.component';
import { TransactionsImportCardComponent } from './components/transactions-import-card/transactions-import-card.component';
import { TransactionCreateCardComponent } from './components/transaction-create-card/transaction-create-card.component';
import { DineroPipe } from './pipes/dinero.pipe';
import { TransactionPipe } from './pipes/transaction.pipe';
import { TransactionTypePipe } from './pipes/transactionType.pipe';
import { ImportColumnTypePipe } from './pipes/importColumnType.pipe';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AccountCreateCardComponent, 
    AccountSelectCardComponent, 
    FileUploadComponent, 
    FileOpenCardComponent, 
    BanknCreateCardComponent, 
    TransactionsImportCardComponent, 
    TransactionCreateCardComponent, 
    DineroPipe, 
    TransactionPipe, 
    TransactionTypePipe, 
    ImportColumnTypePipe, 
    CategoryPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountCreateCardComponent, 
    AccountSelectCardComponent, 
    FileUploadComponent, 
    FileOpenCardComponent, 
    BanknCreateCardComponent, 
    TransactionsImportCardComponent, 
    TransactionCreateCardComponent, 
    DineroPipe, 
    TransactionPipe, 
    TransactionTypePipe, 
    ImportColumnTypePipe, 
    CategoryPipe
  ],
  providers: [
    DineroPipe, 
    TransactionPipe, 
    TransactionTypePipe, 
    ImportColumnTypePipe, 
    CategoryPipe
  ]
})
export class SharedModule { }