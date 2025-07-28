import { TestBed } from '@angular/core/testing';

import { CampagnyService ,Campagny} from './campagny-service';

describe('CampagnyService', () => {
  let service: CampagnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampagnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
