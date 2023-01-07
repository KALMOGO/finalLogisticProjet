import { TestBed } from '@angular/core/testing';

import { SVehiculeLouerService } from './s-vehicule-louer.service';

describe('SVehiculeLouerService', () => {
  let service: SVehiculeLouerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SVehiculeLouerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
