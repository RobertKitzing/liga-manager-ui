import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPersonComponent } from './contact-person.component';
import { MaterialModule } from '../../../material.module';
import { TranslateModule } from '@ngx-translate/core';

describe('ContactPersonComponent', () => {
  let component: ContactPersonComponent;
  let fixture: ComponentFixture<ContactPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        TranslateModule.forRoot()
      ],
      declarations: [ ContactPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
