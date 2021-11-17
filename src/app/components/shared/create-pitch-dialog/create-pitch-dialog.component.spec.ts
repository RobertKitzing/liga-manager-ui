import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePitchDialogComponent } from './create-pitch-dialog.component';

describe('CreatePitchDialogComponent', () => {
  let component: CreatePitchDialogComponent;
  let fixture: ComponentFixture<CreatePitchDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePitchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePitchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
