import { TestBed } from '@angular/core/testing';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { Entity } from '../models/entity';

import { EntityService } from './entity.service';

describe('EntityService', () => {
  let service: EntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('upsertEntity works', () => {
    let bankn = new Bankn("","","");
    expect(bankn.entities.length).toBe(0);
    service.upsertEntity("ent","entDesc");
    expect(bankn.entities.length).toBe(1);
    service.upsertEntity("ent","entDesc");
    expect(bankn.entities.length).toBe(1);
    service.upsertEntity("ent2","entDesc");
    expect(bankn.entities.length).toBe(2);
  });*/

  it('should process fromJson', () => {
    var name = "name";
    var descriptionPatterns: string[] = [];

    //no optional vars
    var entity = EntityService.fromJson({
      name: name,
      descriptionPatterns: descriptionPatterns,
    });
    expect(entity.name).toBe(name);
    expect(entity.descriptionPatterns.length).toBe(0);
    expect(entity.referenceCategory).toBeNull();

    //with optional vars
    var newEntity = EntityService.fromJson({
      name: name,
      descriptionPatterns: ["a","b"],
      referenceCategory: {name:"cat"}
    });
    expect(newEntity.name).toBe(name);
    expect(newEntity.descriptionPatterns.length).toBe(2);
    expect(newEntity.descriptionPatterns[0]).toBe("a");
    expect(newEntity.descriptionPatterns[1]).toBe("b");
    expect(newEntity.referenceCategory).toBeInstanceOf(Category);
    expect(newEntity.referenceCategory?.name).toBe("cat");
  });

  it('should process getEntity', () => {
    var bankn = new Bankn("id","name","PT");
    expect(EntityService.getEntity(bankn, "ent")).toBeNull();
    
    var entity = new Entity("ent");
    bankn.entities.push(entity);
    expect(EntityService.getEntity(bankn, "ent")).toBeTruthy();
  });
});
