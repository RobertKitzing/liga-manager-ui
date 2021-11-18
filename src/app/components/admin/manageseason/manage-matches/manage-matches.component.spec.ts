import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMatchesComponent } from './manage-matches.component';

describe('ManageMatchesComponent', () => {
  let component: ManageMatchesComponent;
  let fixture: ComponentFixture<ManageMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
