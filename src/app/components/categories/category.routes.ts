import { Routes } from '@angular/router';

import { CategoryListComponent } from './category-list.component';
import { CategoryComponent } from './category.component';

export const CATEGORY_ROUTES: Routes = [
  { path: "", component: CategoryListComponent },
  { path: "category", component: CategoryComponent },
  { path: "category/:categoryId", component: CategoryComponent }
];
