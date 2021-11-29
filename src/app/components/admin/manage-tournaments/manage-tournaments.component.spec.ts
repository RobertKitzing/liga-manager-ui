import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';

import { ManageTournamentsComponent } from './manage-tournaments.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ManageTournamentsComponent', () => {
  let component: ManageTournamentsComponent;
  let fixture: ComponentFixture<ManageTournamentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ ManageTournamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
