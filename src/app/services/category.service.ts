import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { BanknService } from './bankn.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private banknService: BanknService,
  ) { }

  static getDirectChildCategory(parent: Category, name: string): Category | null{
    for (let c = 0; c < parent.innerCategories.length; c++) {
      if(parent.innerCategories[c].name == name)
        return parent.innerCategories[c];
    }
    return null;
  }

  upsertCategory(
    categoryFullName?: string,
    description?: string
  ): Category | null {

    if (categoryFullName == null || categoryFullName == undefined || categoryFullName.trim().length == 0) 
      return null;
    
    var categoryNames = categoryFullName.split('.');
  
    var firstCategoryName = categoryNames[0];
    var firstCategory = CategoryService.getCategory(this.banknService.getBankn()!, firstCategoryName);
    if (firstCategory == null) {
      firstCategory = new Category(firstCategoryName);
      this.banknService.addCategory(firstCategory);
    }
    if(categoryNames.length==1){
      //pattern only processed in the inner most category
      CategoryService.upsertDescriptionPatterns(firstCategory, description);
      return firstCategory;
    } else {
      return CategoryService.upsertCategoryRecursive(
        firstCategory,
        categoryFullName.substring(firstCategoryName.length),
        description
      );
    }
  }
  
  private static upsertCategoryRecursive(
    parentCategory: Category,
    categoryFullName: string,
    description?: string
  ): Category | null {

    var categoryNames = categoryFullName.split('.');
    
    var firstCategoryName = categoryNames[0];
    var firstCategory = CategoryService.getDirectChildCategory(parentCategory, firstCategoryName);
    //Create if not exist
    if (firstCategory == null) {
      firstCategory = new Category(firstCategoryName);
      parentCategory.innerCategories.push(firstCategory);
    }

    if(categoryNames.length==1 || categoryFullName.substring(firstCategoryName.length).trim().length == 0 ){
      //pattern only processed in the inner most category
      CategoryService.upsertDescriptionPatterns(firstCategory, description);
      return firstCategory;
    } else {
      //recursive category creation
      return this.upsertCategoryRecursive(
        firstCategory,
        categoryFullName.substring(firstCategoryName.length),
        description
      )
    }
  }

  static upsertDescriptionPatterns(category: Category, description?: string){
    if(description){
      category.descriptionPatterns.push(description);
    }
  }

  public static toJson(category: Category): any {
    
    var innerCategories = [];
    for (let c = 0; c < category.innerCategories.length; c++)
      innerCategories.push(CategoryService.toJson(category.innerCategories[c]));

    var json = {
      name: category.name,
      id: category.id,
      descriptionPatterns: category.descriptionPatterns,
      innerCategories: innerCategories
    };
    return json;
  }

  public static fromJson(json: any): Category {
    var category = new Category(json.name);
    if(json.id)
      category.importId(json.id);
    category.descriptionPatterns = json.descriptionPatterns;
    if (json.innerCategories)
      for(let c = 0; c < json.innerCategories.length; c++)
        category.innerCategories.push(CategoryService.fromJson(json.innerCategory));
    return category;
  }

  static getCategory(
    bankn:Bankn, 
    categoryName: string
  ): Category | null {
    //check top most categories
    for (let c = 0; c < bankn.categories.length; c++) {
      if (bankn.categories[c].name == categoryName) {
        return bankn.categories[c];
      } else {
        var category = this.getCategoryRecursive(categoryName, bankn.categories[c]);
        if (category != null) 
          return category;
      }
    }
    return null;
  }

  private static getCategoryRecursive(
    categoryName: string,
    parentCategory: Category
  ): Category | null {
    //check inner categories
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if (parentCategory.innerCategories[c].name == categoryName) {
        return parentCategory;
      } else {
        if (parentCategory.innerCategories[c].innerCategories != null)
          return this.getCategoryRecursive(categoryName, parentCategory.innerCategories[c]);
      }
    }
    return null;
  }

  static getCategoryFromDescription(
    bankn: Bankn,
    description: string
  ): Category | null {
    
    var biggestRating = 0;
    var category = null;

    //check top most categories
    for (let c = 0; c < bankn.categories.length; c++) {
      if(bankn.categories[c].descriptionPatterns.length>0){
        var rating = UtilsService.calculateSimilarityRating(description, bankn.categories[c].descriptionPatterns);
        if (rating > biggestRating){
          category = bankn.categories[c];
          biggestRating = rating;
        }
      }
    }

    //check top most innercategories
    for (let c = 0; c < bankn.categories.length; c++) {
      if(bankn.categories[c].innerCategories.length >0){
        var result = CategoryService.getInnerBiggestRatingRecursive(description, bankn.categories[c]);
        if (result.biggestRating > biggestRating){
          category = result.category;
          biggestRating = result.biggestRating;
        }
      }
    }

    if(biggestRating > UtilsService.minRating)
      return category;
    else
      return null;
  }

  private static getInnerBiggestRatingRecursive(
    description: string,
    parentCategory: Category
  ): { biggestRating: number; category: Category|null } {
    
    var biggestRating = 0;
    var category = null;

    //find innerCategories biggestRating and compare
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if(parentCategory.innerCategories[c].descriptionPatterns.length>0){
        var rating = UtilsService.calculateSimilarityRating(description, parentCategory.innerCategories[c].descriptionPatterns);
        if (rating > biggestRating){
          category = parentCategory.innerCategories[c];
          biggestRating = rating;
        }
      }
    }

    //find innerCategories.innerCategories biggestRating and compare
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if(parentCategory.innerCategories[c].innerCategories.length>0){
        var result = CategoryService.getInnerBiggestRatingRecursive(description, parentCategory.innerCategories[c]);
        if (result.biggestRating > biggestRating){
          category = result.category;
          biggestRating = result.biggestRating;
        }
      }
    }

    return {
      biggestRating: biggestRating,
      category: category
    };
  }
}
