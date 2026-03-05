import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CategoryComponent ],
      providers: [
              {
                provide: ActivatedRoute,
                useValue: {
                  paramMap: of({ get: (key: string) => '1' }),
                },
              },
              {
                provide: Router,
                useValue: {
                  navigate: jest.fn(),
                },
              },
              {
                provide: Location,
                useValue: {
                  back: jest.fn(),
                },
              },
            ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
