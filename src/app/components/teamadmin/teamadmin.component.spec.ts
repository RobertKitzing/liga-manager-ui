import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamadminComponent } from './teamadmin.component';

describe('TeamadminComponent', () => {
  let component: TeamadminComponent;
  let fixture: ComponentFixture<TeamadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
