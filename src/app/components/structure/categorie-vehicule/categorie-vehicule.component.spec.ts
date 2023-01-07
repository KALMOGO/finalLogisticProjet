import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieVehiculeComponent } from './categorie-vehicule.component';

describe('CategorieVehiculeComponent', () => {
  let component: CategorieVehiculeComponent;
  let fixture: ComponentFixture<CategorieVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
