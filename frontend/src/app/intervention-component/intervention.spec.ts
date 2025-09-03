import { TestBed } from '@angular/core/testing';

import { Intervention } from './intervention';

describe('Intervention', () => {
  let service: Intervention;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Intervention);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
