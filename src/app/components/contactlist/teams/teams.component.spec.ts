import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsComponent } from './teams.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [ TeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
