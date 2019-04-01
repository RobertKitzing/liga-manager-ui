import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepitchesComponent } from './managepitches.component';

describe('ManagepitchesComponent', () => {
  let component: ManagepitchesComponent;
  let fixture: ComponentFixture<ManagepitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagepitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
