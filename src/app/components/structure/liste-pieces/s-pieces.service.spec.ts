import { TestBed } from '@angular/core/testing';

import { SPiecesService } from './s-pieces.service';

describe('SPiecesService', () => {
  let service: SPiecesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPiecesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
