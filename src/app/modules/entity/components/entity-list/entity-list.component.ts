import { Component, OnInit, inject } from '@angular/core';
import { Entity } from 'src/app/models/entity';
import { BanknService } from 'src/app/services/bankn.service';
import { EntityService } from 'src/app/services/entity.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
    selector: 'app-entity-list',
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.css'],
    standalone: false
})
export class EntityListComponent implements OnInit {

    private readonly eventsService = inject(EventsService);
    private readonly entityService = inject(EntityService);
    private readonly banknService = inject(BanknService);

  entities: Entity[] = [];

  ngOnInit() {
    this.refreshEntities();
    this.eventsService.subscribeEntitiesChange(() => this.refreshEntities());
  }
  
  refreshEntities(){
    this.entities = this.banknService.getBankn()!.entities;
  }
}
