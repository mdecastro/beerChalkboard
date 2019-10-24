import { TestBed } from '@angular/core/testing';

import { BrewerService } from './brewer.service';

describe('BrewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrewerService = TestBed.get(BrewerService);
    expect(service).toBeTruthy();
  });
});
