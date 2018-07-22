import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetournamentComponent } from './managetournament.component';

describe('ManagetournamentComponent', () => {
  let component: ManagetournamentComponent;
  let fixture: ComponentFixture<ManagetournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagetournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
