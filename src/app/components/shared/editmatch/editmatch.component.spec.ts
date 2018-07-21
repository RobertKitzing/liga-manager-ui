import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmatchComponent } from './editmatch.component';

describe('EditmatchComponent', () => {
  let component: EditmatchComponent;
  let fixture: ComponentFixture<EditmatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
