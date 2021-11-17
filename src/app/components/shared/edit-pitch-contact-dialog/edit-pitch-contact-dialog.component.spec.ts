import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPitchContactDialogComponent } from './edit-pitch-contact-dialog.component';

describe('EditPitchContactDialogComponent', () => {
  let component: EditPitchContactDialogComponent;
  let fixture: ComponentFixture<EditPitchContactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPitchContactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPitchContactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
