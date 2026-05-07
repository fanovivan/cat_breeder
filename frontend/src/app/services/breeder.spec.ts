import { TestBed } from '@angular/core/testing';

import { Breeder } from './breeder';

describe('Breeder', () => {
  let service: Breeder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Breeder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
