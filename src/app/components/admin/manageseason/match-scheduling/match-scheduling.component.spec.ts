import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSchedulingComponent } from './match-scheduling.component';

describe('MatchSchedulingComponent', () => {
  let component: MatchSchedulingComponent;
  let fixture: ComponentFixture<MatchSchedulingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchSchedulingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchSchedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
