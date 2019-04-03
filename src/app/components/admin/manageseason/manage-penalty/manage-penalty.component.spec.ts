import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePenaltyComponent } from './manage-penalty.component';

describe('ManagePenaltyComponent', () => {
  let component: ManagePenaltyComponent;
  let fixture: ComponentFixture<ManagePenaltyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePenaltyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePenaltyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
