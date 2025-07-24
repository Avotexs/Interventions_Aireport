import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campagny } from './campagny';

describe('Campagny', () => {
  let component: Campagny;
  let fixture: ComponentFixture<Campagny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Campagny]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Campagny);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
