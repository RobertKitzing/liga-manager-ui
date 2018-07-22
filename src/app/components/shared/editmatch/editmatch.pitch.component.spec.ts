import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmatchPitchComponent } from './editmatch.pitch.component';

describe('EditmatchPitchComponent', () => {
  let component: EditmatchPitchComponent;
  let fixture: ComponentFixture<EditmatchPitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmatchPitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmatchPitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
