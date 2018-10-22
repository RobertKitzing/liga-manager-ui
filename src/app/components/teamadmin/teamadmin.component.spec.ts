import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamadminComponent } from './teamadmin.component';
import { TeamadminModule } from './teamadmin.module';
import { SharedModule } from '../../shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ROUTES } from '../../app-routing.module';
import { TranslateModule } from '@ngx-translate/core';

describe('TeamadminComponent', () => {
  let component: TeamadminComponent;
  let fixture: ComponentFixture<TeamadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TeamadminModule,
        SharedModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(APP_ROUTES)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
