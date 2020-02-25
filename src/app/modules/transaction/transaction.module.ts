import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from '../shared/shared.module';

//import {AppModule} from '../../app.module'

import { TransactionListComponent } from './transaction-list/transaction-list.component'

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    SharModule
  ],
  declarations: [
    TransactionListComponent
  ],
  exports: []
})
export class TransactionModule { }