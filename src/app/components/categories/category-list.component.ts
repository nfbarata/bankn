import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category';
import { BanknService } from '../../services/bankn.service';
import { EventsService } from '../../services/events.service';
import { CategoryPipe } from '../../pipes/category.pipe';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-category-list',
    standalone: true,
    imports: [CommonModule, RouterModule, CategoryPipe],
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  private readonly eventsService = inject(EventsService);
  private readonly banknService = inject(BanknService);

  private subscriptions = new Subscription();
  categories: Category[] = [];

  ngOnInit() {
    this.refreshCategories();
    this.subscriptions.add(this.eventsService.subscribeCategoriesChange(() => this.refreshCategories()));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
