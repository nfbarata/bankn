import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
export class CategoryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly categoryService = inject(CategoryService);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    parent: new FormControl(),
    isDebit: new FormControl(true, [Validators.required]),
  });

  categories: Category[] = [];

  ngOnInit() {
    //this.categories = this.categoryService.getCategories();
    this.route.paramMap.subscribe((params) => {
      var categoryId = params.get('categoryId');
      if (categoryId) {
        /*const category = this.categoryService.getCategory(categoryId);
        if(category){
          this.form.setValue({
            id: category.id,
            name: category.name,
            parent: category.parent ? category.parent.id : null,
            isDebit: category.isDebit,
          });
        }*/
      } 
    });
  }

  onSubmit() {
    if (this.form.valid) {
      /*if (this.form.value.id) {
        this.categoryService.updateCategory(
          this.form.value.id,
          this.form.value.name,
          this.form.value.parent,
          this.form.value.isDebit
        );
      } else {
        this.categoryService.createCategory(
          this.form.value.name,
          this.form.value.parent,
          this.form.value.isDebit
        );
      }
      this.form.reset();
      this.router.navigate(['/categories']);*/
    }
  }

  onDelete(categoryId: string) {
    //this.categoryService.deleteCategory(categoryId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
