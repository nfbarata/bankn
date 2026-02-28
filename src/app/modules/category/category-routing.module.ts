import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryComponent } from './components/category/category.component';

const routes: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "account", component: CategoryComponent },
  { path: "account/:accountId", component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
