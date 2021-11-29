import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { CancelMatchDialogComponent } from './cancel-match-dialog.component';

describe('CancelMatchDialogComponent', () => {
  let component: CancelMatchDialogComponent;
  let fixture: ComponentFixture<CancelMatchDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelMatchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelMatchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
