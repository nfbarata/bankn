import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { BanknService } from '../../services/bankn.service';
import { Category } from '../../models/category';
import { CategoryPipe } from "../../pipes/category.pipe";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CategoryPipe],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly categoryService = inject(CategoryService);
  private readonly banknService = inject(BanknService);

  private subscriptions = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    topLevelCategory: new FormControl(),
    descriptionPatterns: new FormControl()
  });

  categories: Category[] = [];

  ngOnInit() {
    this.categories = CategoryService.getAllCategories(this.banknService.getBankn()!);
    
    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      var categoryId = params.get('categoryId');
      if (categoryId) {
        this.categories = this.categories.filter(category => category.id != categoryId);
        const category = this.categoryService.getCategory(categoryId);
        if (category) {
          //this.form.patchValue(category);
          this.form.setValue({
            id: category.id,
            name: category.name,
            descriptionPatterns: category.descriptionPatterns.join('\n'),
            topLevelCategory: category.topLevelCategory ? CategoryService.getFullCategoryName(category.topLevelCategory) : '',
          });
        }
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.categoryService.upsertCategory(this.form.value);
    }
  }

  onDelete(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
