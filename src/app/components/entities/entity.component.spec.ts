import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

import { EntityComponent } from './entity.component';

describe('EntityComponent', () => {
  let component: EntityComponent;
  let fixture: ComponentFixture<EntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityComponent],
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
    }).compileComponents();

    fixture = TestBed.createComponent(EntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
