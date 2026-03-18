import { Injectable, inject } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { BanknService } from './bankn.service';
import { UtilsService } from './utils.service';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private banknService = inject(BanknService);

  getCategory(id: string): Category | null {
    const bankn = this.banknService.getBankn();
    if (bankn) {
      return CategoryService.getAllCategories(bankn).find(e => e.id === id) || null;
    }
    return null;
  }

  deleteCategory(id: string): void {
    var category = this.getCategory(id);
    if (category){
      // clear category from transactions
      const bankn = this.banknService.getBankn();
      if (bankn) {
        for( var account of bankn.accounts){
          for(var txn of account.transactions){
            if(txn.category && txn.category.id == category.id){
              txn.category = undefined;
            }
          }
        }
      }
      this.banknService._deleteCategory(category);
    }
    else
      console.error("category not found: " + id);
  }

  static getFullCategoryName(category: Category): string {
    if (category.topLevelCategory) {
      return this.getFullCategoryName(category.topLevelCategory) + '.' + category.name;
    } else {
      return category.name;
    }
  }

  static getDirectChildCategory(parent: Category, name: string): Category | null {
    for (let c = 0; c < parent.innerCategories.length; c++) {
      if (parent.innerCategories[c].name == name)
        return parent.innerCategories[c];
    }
    return null;
  }

  upsertCategory(
    categoryFullName?: string,
    description?: string
  ): Category | null {

    if (!categoryFullName || categoryFullName.trim().length === 0) {
      return null;
    }

    const categoryNames = categoryFullName.split('.').filter(name => name.trim().length > 0);
    if (categoryNames.length === 0) {
      return null;
    }

    let currentCategory: Category | null = null;
    let parentCategory: Category | undefined = undefined;

    for (let i = 0; i < categoryNames.length; i++) {
      const categoryName = categoryNames[i];
      if (i === 0) {
        currentCategory = CategoryService.searchCategory(this.banknService.getBankn()!, categoryName);
        if (!currentCategory) {
          currentCategory = new Category(categoryName);
          this.banknService._addCategory(currentCategory);
        }
      } else {
        let childCategory = CategoryService.getDirectChildCategory(parentCategory!, categoryName);
        if (!childCategory) {
          childCategory = new Category(categoryName, parentCategory);
          parentCategory!.innerCategories.push(childCategory);
        }
        currentCategory = childCategory;
      }
      parentCategory = currentCategory as Category;
    }

    if (currentCategory && description) {
      CategoryService.upsertDescriptionPatterns(currentCategory, description);
    }

    return currentCategory;
  }

  static upsertDescriptionPatterns(category: Category, description?: string) {
    if (description && category.descriptionPatterns.indexOf(description) === -1) {
      category.descriptionPatterns.push(description);
    }
  }

  public static toJson(category: Category): any {

    var innerCategories: any[] = [];
    if (category.innerCategories)
      category.innerCategories.forEach((ic) => {
        innerCategories.push(this.toJson(ic));
      });

    var json = {
      name: category.name,
      _id: category.id,
      descriptionPatterns: category.descriptionPatterns,
      innerCategories: innerCategories
    };
    return json;
  }

  public static fromJson(json: any, topLevelCategory?: Category): Category {
    var category = new Category(json.name, topLevelCategory);
    if (json._id)
      category.importId(json._id);
    category.descriptionPatterns = json.descriptionPatterns;
    if (json.innerCategories)
      for (var ic of json.innerCategories) {
        var innerCategory = CategoryService.fromJson(ic, category);
        category.innerCategories.push(innerCategory);
      };
    // console.log('Parsed category', category);
    return category;
  }

  public static getAllCategories(bankn: Bankn): Category[] {
    var categories: Category[] = [];
    bankn.categories.forEach((c) => {
      categories.push(c);
      categories.push(...this.getInnerCategories(c));
    });
    return categories;
  }

  private static getInnerCategories(category: Category): Category[] {
    var innerCategories: Category[] = [];
    if (category.innerCategories)
      category.innerCategories.forEach((ic) => {
        innerCategories.push(ic);
        innerCategories.push(...this.getInnerCategories(ic));
      });
    return innerCategories;
  }

  public static getCategory(id: string, bankn: Bankn): Category | null {
    for (let c = 0; c < bankn.categories.length; c++) {
      if (bankn.categories[c].id == id) {
        return bankn.categories[c];
      } else {
        var childCategory = CategoryService.getCategoryRecursive(id, bankn.categories[c]);
        if (childCategory != null)
          return childCategory;
      }
    }
    return null;
  }

  private static getCategoryRecursive(id: string, parentCategory: Category): Category | null {
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if (parentCategory.innerCategories[c].id === id)
        return parentCategory.innerCategories[c];
      else {
        var childCategory = CategoryService.getCategoryRecursive(id, parentCategory.innerCategories[c]);
        if (childCategory != null)
          return childCategory;
      }
    }
    return null;
  }

  public static searchCategory(
    bankn: Bankn,
    categoryName: string
  ): Category | null {
    //check top most categories
    for (let c = 0; c < bankn.categories.length; c++) {
      if (bankn.categories[c].name == categoryName) {
        return bankn.categories[c];
      } else {
        var category = this.searchCategoryRecursive(categoryName, bankn.categories[c]);
        if (category != null)
          return category;
      }
    }
    return null;
  }

  private static searchCategoryRecursive(
    categoryName: string,
    parentCategory: Category
  ): Category | null {
    //check inner categories
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if (parentCategory.innerCategories[c].name == categoryName) {
        return parentCategory.innerCategories[c];
      } else {
        var category = this.searchCategoryRecursive(categoryName, parentCategory.innerCategories[c]);
        if (category != null)
          return category;
      }
    }
    return null;
  }

  public static getCategoryFromDescription(
    bankn: Bankn,
    description: string
  ): Category | null {

    var biggestRating = 0;
    var category = null;

    //check top most categories
    for (let c = 0; c < bankn.categories.length; c++) {
      if (bankn.categories[c].descriptionPatterns.length > 0) {
        var rating = UtilsService.calculateSimilarityRating(description, bankn.categories[c].descriptionPatterns);
        if (rating > biggestRating) {
          category = bankn.categories[c];
          biggestRating = rating;
        }
      }
    }

    //check top most innercategories
    for (let c = 0; c < bankn.categories.length; c++) {
      if (bankn.categories[c].innerCategories.length > 0) {
        var result = CategoryService.getInnerBiggestRatingRecursive(description, bankn.categories[c]);
        if (result.biggestRating > biggestRating) {
          category = result.category;
          biggestRating = result.biggestRating;
        }
      }
    }

    if (biggestRating > UtilsService.minRating)
      return category;
    else
      return null;
  }

  private static getInnerBiggestRatingRecursive(
    description: string,
    parentCategory: Category
  ): { biggestRating: number; category: Category | null } {

    var biggestRating = 0;
    var category = null;

    //find innerCategories biggestRating and compare
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if (parentCategory.innerCategories[c].descriptionPatterns.length > 0) {
        var rating = UtilsService.calculateSimilarityRating(description, parentCategory.innerCategories[c].descriptionPatterns);
        if (rating > biggestRating) {
          category = parentCategory.innerCategories[c];
          biggestRating = rating;
        }
      }
    }

    //find innerCategories.innerCategories biggestRating and compare
    for (let c = 0; c < parentCategory.innerCategories.length; c++) {
      if (parentCategory.innerCategories[c].innerCategories.length > 0) {
        var result = CategoryService.getInnerBiggestRatingRecursive(description, parentCategory.innerCategories[c]);
        if (result.biggestRating > biggestRating) {
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
