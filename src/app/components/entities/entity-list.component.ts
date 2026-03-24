import { Component, OnInit, inject } from '@angular/core';
import { Entity } from '../../models/entity';
import { BanknService } from '../../services/bankn.service';
import { EntityService } from '../../services/entity.service';
import { EventsService } from '../../services/events.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryPipe } from "../../pipes/category.pipe";

@Component({
    selector: 'app-entity-list',
    standalone: true,
    imports: [CommonModule, RouterModule, CategoryPipe],
    templateUrl: './entity-list.component.html',
    styleUrls: ['./entity-list.component.css']
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
