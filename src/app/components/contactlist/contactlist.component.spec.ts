import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactlistComponent } from './contactlist.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContactlistModule } from './contactlist.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactlistComponent', () => {
  let component: ContactlistComponent;
  let fixture: ComponentFixture<ContactlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        ContactlistModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
