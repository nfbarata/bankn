import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { BanknService } from 'src/app/services/bankn.service';
import { CategoryService } from 'src/app/services/category.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private eventsService: EventsService,
    private categoryService: CategoryService,
    private banknService: BanknService
  ) { }

  ngOnInit() {
    this.refreshCategories();
    this.eventsService.categoriesChange.subscribe(()=>{
      this.refreshCategories();
    });
  }
  
  refreshCategories(){
    this.categories = [];
    this.banknService.getBankn()!.categories.forEach((c) => {
      this.categories.push(...this._addAllChilds(c));
    });
  }

  _addAllChilds(category : Category) : Category[]{
      var result: Category[] = [];
      result.push(category);
      category.innerCategories.forEach((ic) => {
        result.push(...this._addAllChilds(ic));
      });
      return result;
  }
}
