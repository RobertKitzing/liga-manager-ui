import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtournamentroundComponent } from './addtournamentround.component';

describe('AddtournamentroundComponent', () => {
  let component: AddtournamentroundComponent;
  let fixture: ComponentFixture<AddtournamentroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtournamentroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtournamentroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
