import { TestBed } from '@angular/core/testing';

import { ComptoireService } from './comptoire-service';

describe('ComptoireService', () => {
  let service: ComptoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComptoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
