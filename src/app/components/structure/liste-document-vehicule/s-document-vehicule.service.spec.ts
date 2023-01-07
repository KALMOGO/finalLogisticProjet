import { TestBed } from '@angular/core/testing';

import { SDocumentVehiculeService } from './s-document-vehicule.service';

describe('SDocumentVehiculeService', () => {
  let service: SDocumentVehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDocumentVehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
