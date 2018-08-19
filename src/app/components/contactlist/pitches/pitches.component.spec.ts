import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchesComponent } from './pitches.component';

describe('PitchesComponent', () => {
  let component: PitchesComponent;
  let fixture: ComponentFixture<PitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
