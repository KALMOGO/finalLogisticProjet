import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDocumentVehiculeComponent } from './liste-document-vehicule.component';

describe('ListeDocumentVehiculeComponent', () => {
  let component: ListeDocumentVehiculeComponent;
  let fixture: ComponentFixture<ListeDocumentVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDocumentVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDocumentVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
