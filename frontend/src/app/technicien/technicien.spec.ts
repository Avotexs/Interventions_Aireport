import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Technicien } from './technicien';

describe('Technicien', () => {
  let component: Technicien;
  let fixture: ComponentFixture<Technicien>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Technicien]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Technicien);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
