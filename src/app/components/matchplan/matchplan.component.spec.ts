import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchplanComponent } from './matchplan.component';
import { MatchplanModule } from './matchplan.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MatchplanComponent', () => {
  let component: MatchplanComponent;
  let fixture: ComponentFixture<MatchplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatchplanModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
