import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleGuard } from './role-guard';

describe('roleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return a CanActivateFn', () => {
    const guardFn = roleGuard(['admin', 'technicien']);
    expect(typeof guardFn).toBe('function');
  });
});
