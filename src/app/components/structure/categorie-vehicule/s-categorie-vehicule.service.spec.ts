import { TestBed } from '@angular/core/testing';

import { SCategorieVehiculeService } from './s-categorie-vehicule.service';

describe('SCategorieVehiculeService', () => {
  let service: SCategorieVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SCategorieVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
