import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router, provideRouter } from '@angular/router';
import { EntityService } from '../../services/entity.service';

@Component({
    selector: 'app-entity',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly entityService = inject(EntityService);

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      var entityId = params.get('entityId');
      if (entityId) {
        /*const entity = this.entityService.getEntity(entityId);
        if(entity){
          this.form.setValue({
            id: entity.id,
            name: entity.name,
          });
        }*/
      } 
    });
  }

  onSubmit() {
    if (this.form.valid) {
      /*if (this.form.value.id) {
        this.entityService.updateEntity(
          this.form.value.id,
          this.form.value.name
        );
      } else {
        this.entityService.createEntity(
          this.form.value.name
        );
      }*/
      this.form.reset();
      this.router.navigate(['/entities']);
    }
  }

  onDelete(entityId: string) {
    //this.entityService.deleteEntity(entityId);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
