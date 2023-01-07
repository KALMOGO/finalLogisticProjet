import { TestBed } from '@angular/core/testing';

import { SProduitsService } from './s-produits.service';

describe('SProduitsService', () => {
  let service: SProduitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SProduitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
