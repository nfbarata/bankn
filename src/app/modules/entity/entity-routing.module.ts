import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityComponent } from './components/entity/entity.component';

const routes: Routes = [
  { path: "", component: EntityListComponent },
  { path: "account", component: EntityComponent },
  { path: "account/:accountId", component: EntityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntityRoutingModule { }
