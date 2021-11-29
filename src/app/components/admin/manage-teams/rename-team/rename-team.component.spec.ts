import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { RenameTeamComponent } from './rename-team.component';

describe('RenameTeamComponent', () => {
  let component: RenameTeamComponent;
  let fixture: ComponentFixture<RenameTeamComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
