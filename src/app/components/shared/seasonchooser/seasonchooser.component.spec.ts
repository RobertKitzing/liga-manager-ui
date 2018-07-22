import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonchooserComponent } from './seasonchooser.component';

describe('SeasonchooserComponent', () => {
  let component: SeasonchooserComponent;
  let fixture: ComponentFixture<SeasonchooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonchooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonchooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
