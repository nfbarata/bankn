import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
  ]
})
export class CategoryModule { }
