import { TestBed } from '@angular/core/testing';

import { SClientsService } from './s-clients.service';

describe('SClientsService', () => {
  let service: SClientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SClientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
