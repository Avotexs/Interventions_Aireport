import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportComponent } from './aeroport-component';

describe('AeroportComponent', () => {
  let component: AeroportComponent;
  let fixture: ComponentFixture<AeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AeroportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
