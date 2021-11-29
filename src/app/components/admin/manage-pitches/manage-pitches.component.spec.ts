import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ManagePitchesComponent } from './manage-pitches.component';

describe('ManagePitchesComponent', () => {
  let component: ManagePitchesComponent;
  let fixture: ComponentFixture<ManagePitchesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
