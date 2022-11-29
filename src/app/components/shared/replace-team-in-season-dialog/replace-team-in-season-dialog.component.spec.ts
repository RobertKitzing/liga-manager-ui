import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceTeamInSeasonDialogComponent } from './replace-team-in-season-dialog.component';

describe('ReplaceTeamInSeasonDialogComponent', () => {
  let component: ReplaceTeamInSeasonDialogComponent;
  let fixture: ComponentFixture<ReplaceTeamInSeasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceTeamInSeasonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceTeamInSeasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
