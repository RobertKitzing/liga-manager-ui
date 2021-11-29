import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { EditPitchContactDialogComponent } from './edit-pitch-contact-dialog.component';

describe('EditPitchContactDialogComponent', () => {
  let component: EditPitchContactDialogComponent;
  let fixture: ComponentFixture<EditPitchContactDialogComponent>;

  beforeEach(waitForAsync(() => {
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
