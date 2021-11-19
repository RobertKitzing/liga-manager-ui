import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMatchDaysComponent } from './manage-match-days.component';

describe('ManageMatchDaysComponent', () => {
  let component: ManageMatchDaysComponent;
  let fixture: ComponentFixture<ManageMatchDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMatchDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMatchDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
