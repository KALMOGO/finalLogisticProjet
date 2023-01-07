import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVehiculeLouesComponent } from './liste-vehicule-loues.component';

describe('ListeVehiculeLouesComponent', () => {
  let component: ListeVehiculeLouesComponent;
  let fixture: ComponentFixture<ListeVehiculeLouesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVehiculeLouesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeVehiculeLouesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
