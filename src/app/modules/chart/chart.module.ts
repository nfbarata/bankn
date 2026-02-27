import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartRoutingModule } from './chart-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ChartListComponent } from './components/chart-list/chart-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartRoutingModule,
    SharedModule,
  ],
  declarations: [ChartListComponent],
})
export class ChartModule {}
