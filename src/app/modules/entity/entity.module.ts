import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntityRoutingModule } from './entity-routing.module';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { EntityComponent } from './components/entity/entity.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    EntityListComponent,
    EntityComponent
  ],
  imports: [
    CommonModule,
    EntityRoutingModule,
    SharedModule
  ]
})
export class EntityModule { }
