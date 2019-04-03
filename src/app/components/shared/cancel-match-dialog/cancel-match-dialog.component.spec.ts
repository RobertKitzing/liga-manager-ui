import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelMatchDialogComponent } from './cancel-match-dialog.component';

describe('CancelMatchDialogComponent', () => {
  let component: CancelMatchDialogComponent;
  let fixture: ComponentFixture<CancelMatchDialogComponent>;

  beforeEach(async(() => {
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
