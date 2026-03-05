import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BanknRoutingModule } from './bankn-routing.module'
import { SharedModule } from '../shared/shared.module';

import { BanknComponent } from './components/bankn/bankn.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        BanknRoutingModule,
        SharedModule,
        BanknComponent
    ],
    exports: []
})
export class BanknModule { 

}