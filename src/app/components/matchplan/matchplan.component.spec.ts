import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchplanComponent } from './matchplan.component';

describe('MatchplanComponent', () => {
  let component: MatchplanComponent;
  let fixture: ComponentFixture<MatchplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
