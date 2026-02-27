import { TestBed } from '@angular/core/testing';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { BanknService } from './bankn.service';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;
  //let banknServiceMock: jasmine.SpyObj<BanknService>;
  
  beforeEach(() => {
    //banknServiceMock = jasmine.createSpyObj([]);
    TestBed.configureTestingModule({imports: [ ],
      declarations: [],
      providers: [
        //{provide: BanknService, useValue: banknServiceMock}
      ]});
    service = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('upsertCategory works', () => {
    let bankn = new Bankn("", "", "");
    expect(bankn.categories.length).toBe(0);
    service.upsertCategory("cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    service.upsertCategory("cat","catDesc");
    expect(bankn.categories.length).toBe(1);
    service.upsertCategory("cat2","catDesc2");
    expect(bankn.categories.length).toBe(2);

    //service.upsertCategory("cat.cat11","catDesc");
    //expect(service.getBankn()?.categories.length).toBe(2);
  });*/

  it('should process fromJson', () => {
    var name = "name";
    var descriptionPatterns: string[] = [];

    var categoryJson: any = {
      name: name,
      descriptionPatterns: descriptionPatterns,
    };
    //no optional vars
    var category = CategoryService.fromJson(categoryJson);
    expect(category.name).toBe(name);
    expect(category.descriptionPatterns.length).toBe(0);
    expect(category.innerCategories).toEqual([]);

    //with optional vars
    var newCategoryJson:any = {};
    newCategoryJson.name = name;
    newCategoryJson.descriptionPatterns = ["a","b"];
    newCategoryJson.innerCategories = [];
    //newCategoryJson.innerCategories.push(categoryJson);
    console.log(categoryJson);
    console.log(newCategoryJson);
    
    var newCategory = CategoryService.fromJson(newCategoryJson);
    expect(newCategory.name).toBe(name);
    expect(newCategory.descriptionPatterns.length).toBe(2);
    expect(newCategory.descriptionPatterns[0]).toBe("a");
    expect(newCategory.descriptionPatterns[1]).toBe("b");
    //expect(newCategory.innerCategories).toBe([category]);
    //expect(newCategory.innerCategories[0].name).toBe(name);
  });

  it('should process getCategory', () => {
    var bankn = new Bankn("id","name","PT");
    expect(CategoryService.getCategory(bankn, "cat")).toBeNull();
    
    var category = new Category("cat");
    bankn.categories.push(category);
    expect(CategoryService.getCategory(bankn, "cat")).toBeTruthy();
    
    var subCategory = new Category("subcat");
    category.innerCategories.push(subCategory);
    expect(CategoryService.getCategory(bankn, "cat")).toBeTruthy();
    expect(CategoryService.getCategory(bankn, "subcat")).toBeTruthy();

    var sub2Category = new Category("subcat2");
    subCategory.innerCategories.push(sub2Category);
    expect(CategoryService.getCategory(bankn, "cat")).toBeTruthy();
    expect(CategoryService.getCategory(bankn, "subcat")).toBeTruthy();
    expect(CategoryService.getCategory(bankn, "subcat2")).toBeTruthy();
  });
});
