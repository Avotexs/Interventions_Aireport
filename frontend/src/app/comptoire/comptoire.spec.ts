import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptoireComponent } from './comptoire-component';

describe('ComptoireComponent', () => {
  let component: ComptoireComponent;
  let fixture: ComponentFixture<ComptoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComptoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
