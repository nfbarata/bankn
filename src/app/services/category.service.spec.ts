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

  it('should process searchCategory & getCategory & getAllCategories', () => {
    var bankn = new Bankn("id","name","PT");
    expect(CategoryService.searchCategory(bankn, "cat")).toBeNull();
    
    var category = new Category("cat");
    var category2 = new Category("cat2");
    bankn.categories.push(category);
    bankn.categories.push(category2);
    expect(CategoryService.searchCategory(bankn, "cat")).toBeTruthy();
    expect(CategoryService.getCategory(category.id, bankn)?.id).toBe(category.id);
    
    var subCategory = new Category("subcat");
    category2.innerCategories.push(subCategory);
    expect(CategoryService.searchCategory(bankn, "cat")).toBeTruthy();
    expect(CategoryService.searchCategory(bankn, "subcat")).toBeTruthy();
    expect(CategoryService.getCategory(subCategory.id, bankn)?.id).toBe(subCategory.id);

    var sub2Category = new Category("subcat2");
    subCategory.innerCategories.push(sub2Category);
    expect(CategoryService.searchCategory(bankn, "cat")).toBeTruthy();
    expect(CategoryService.searchCategory(bankn, "subcat")).toBeTruthy();
    expect(CategoryService.searchCategory(bankn, "subcat2")).toBeTruthy();
    expect(CategoryService.getCategory(sub2Category.id, bankn)?.id).toBe(sub2Category.id);

    expect(CategoryService.getAllCategories(bankn)?.length).toBe(4);
  });
});
