import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageseasonComponent } from './manageseason.component';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { OwlDateTimeModule } from 'ng-pick-datetime';

describe('ManageseasonComponent', () => {
  let component: ManageseasonComponent;
  let fixture: ComponentFixture<ManageseasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MaterialModule,
        OwlDateTimeModule
      ],
      declarations: [ ManageseasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageseasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
