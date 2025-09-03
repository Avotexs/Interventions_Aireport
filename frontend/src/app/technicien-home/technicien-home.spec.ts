import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicienHomeComponent } from './technicien-home';

describe('TechnicienHome', () => {
  let component: TechnicienHomeComponent;
  let fixture: ComponentFixture<TechnicienHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicienHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicienHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
