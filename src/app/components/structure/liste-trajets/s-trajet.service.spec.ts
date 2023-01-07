import { TestBed } from '@angular/core/testing';

import { STrajetService } from './s-trajet.service';

describe('STrajetService', () => {
  let service: STrajetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(STrajetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
