import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageseasonComponent } from './manageseason.component';

describe('ManageseasonComponent', () => {
  let component: ManageseasonComponent;
  let fixture: ComponentFixture<ManageseasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageseasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageseasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
