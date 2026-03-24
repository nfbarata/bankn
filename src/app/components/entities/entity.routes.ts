import { Routes } from '@angular/router';
import { EntityListComponent } from './entity-list.component';
import { EntityComponent } from './entity.component';

export const ENTITY_ROUTES: Routes = [
  { path: "", component: EntityListComponent },
  { path: "entity", component: EntityComponent },
  { path: "entity/:entityId", component: EntityComponent }
];
