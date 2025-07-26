import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampagnyComponent } from './Campagny-Component';

describe('CampagnyComponent', () => {
  let component: CampagnyComponent;
  let fixture: ComponentFixture<CampagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
          imports: [CampagnyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
