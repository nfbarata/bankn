import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { Entity } from '../models/entity';
import { BanknService } from './bankn.service';
import { CategoryService } from './category.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private banknService: BanknService,
    private utilsService: UtilsService
  ) { }

  upsertEntity(
    entityName?: string,
    description?: string,
    referenceCategory: Category | null = null
  ): Entity | null {
    
    //Guard
    if (entityName == null || entityName == undefined || entityName.trim().length == 0) 
      return null;

    var entity = EntityService.getEntity(this.banknService.getBankn()! ,entityName);
    if (entity == null) {
      entity = new Entity(entityName);
      this.banknService.addEntity(entity);
    }

    EntityService.upsertDescriptionPatterns(entity, description);

    if (referenceCategory) 
      entity.referenceCategory = referenceCategory;
    
      return entity;
  }

  static upsertDescriptionPatterns(entity: Entity, description?: string){
    if(description){
      entity.descriptionPatterns.push(description);
    }
  }

  static getEntity(bankn:Bankn, entityName: string): Entity | null {
    for (let e = 0; e < bankn.entities.length; e++) {
      if (bankn.entities[e].name == entityName) 
        return bankn.entities[e];
    }
    return null;
  }

  static getEntityFromDescription(
    bankn: Bankn,
    description: string,
    referenceCategory: Category | null
  ): Entity | null {
    //TODO check also category
    var biggestEntityRating = 0;
    var entity = null;
    for (let e = 0; e < bankn.entities.length; e++) {
      if(bankn.entities[e].descriptionPatterns.length>0){
        var entityRating = UtilsService.calculateSimilarityRating(description, bankn.entities[e].descriptionPatterns);
        if (entityRating > biggestEntityRating){
          biggestEntityRating = entityRating;
          entity = bankn.entities[e];
        }
      }
    }
    if(biggestEntityRating > UtilsService.minRating)
      return entity;
    else
      return null;
  }

  public static toJson(entity: Entity): any {
    return {
      name: entity.name,
      id: entity.id,
      descriptionPatterns: entity.descriptionPatterns,
      referenceCategory:
      entity.referenceCategory == null ? '' : CategoryService.toJson(entity.referenceCategory),
    };
  }

  public static fromJson(json: any): Entity {
    var entity = new Entity(json.name);
    if(json.id)
      entity.importId(json.id);
    entity.descriptionPatterns = json.descriptionPatterns;
    if (json.referenceCategory)
      entity.referenceCategory = CategoryService.fromJson(json.referenceCategory);
    return entity;
  }

}
