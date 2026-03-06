import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { BanknService } from 'src/app/services/bankn.service';
import { CategoryPipe } from "../../pipes/category.pipe";

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, CategoryPipe],
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly banknService = inject(BanknService);
  private readonly entityService = inject(EntityService);
  private readonly categoryService = inject(CategoryService);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    descriptionPatterns: new FormControl(''),
    referenceCategory: new FormControl(),
  });

  categories: Category[] = [];

  ngOnInit() {
    this.categories = CategoryService.getAllCategories(this.banknService.getBankn()!);
    this.route.paramMap.subscribe((params) => {
      var entityId = params.get('entityId');
      if (entityId) {
        const entity = this.entityService.getEntity(entityId);
        if (entity) {
          this.form.setValue({
            id: entity.id,
            name: entity.name,
            descriptionPatterns: entity.descriptionPatterns.join('\n'),
            referenceCategory: entity.referenceCategory ? CategoryService.getFullCategoryName(entity.referenceCategory) : '',
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.entityService.upsertEntity(
        this.form.value.id,
        this.form.value.name,
        this.form.value.descriptionPatterns.split('\n'),
        this.form.value.referenceCategory
      );
      this.form.reset();
      this.router.navigate(['/entities']);
    }
  }

  onDelete(entityId: string) {
    this.entityService.deleteEntity(entityId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
