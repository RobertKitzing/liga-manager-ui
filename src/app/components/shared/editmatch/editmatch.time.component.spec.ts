import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmatchTimeComponent } from './editmatch.time.component';

describe('Editmatch.TimeComponent', () => {
  let component: EditmatchTimeComponent;
  let fixture: ComponentFixture<EditmatchTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmatchTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmatchTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
