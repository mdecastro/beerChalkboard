import { TestBed } from '@angular/core/testing';

import { BeerStyleService } from './beer-style.service';

describe('BeerStyleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeerStyleService = TestBed.get(BeerStyleService);
    expect(service).toBeTruthy();
  });
});
