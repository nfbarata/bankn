import { Component, OnInit } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { BanknService } from 'src/app/services/bankn.service';
import { EntityService } from 'src/app/services/entity.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  entities: Entity[] = [];

  constructor(
    private eventsService: EventsService,
    private entityService: EntityService,
    private banknService: BanknService
  ) { }

  ngOnInit() {
    this.refreshEntities();
    this.eventsService.entitiesChange.subscribe(()=>{
      this.refreshEntities();
    });
  }
  
  refreshEntities(){
    this.entities = this.banknService.getBankn()!.entities;
  }
}
