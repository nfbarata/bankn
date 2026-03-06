import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly categoryService = inject(CategoryService);

  private subscriptions = new Subscription();

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    parent: new FormControl(),
    isDebit: new FormControl(true, [Validators.required]),
  });

  categories: Category[] = [];

  ngOnInit() {
    this.subscriptions.add(this.route.paramMap.subscribe((params) => {
      var categoryId = params.get('categoryId');
      if (categoryId) {
        //... 
      } 
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      //...
    }
  }

  onDelete(categoryId: string) {
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
