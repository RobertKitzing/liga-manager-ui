import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchesComponent } from './pitches.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PitchesComponent', () => {
  let component: PitchesComponent;
  let fixture: ComponentFixture<PitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        HttpClientTestingModule
      ],
      declarations: [ PitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
