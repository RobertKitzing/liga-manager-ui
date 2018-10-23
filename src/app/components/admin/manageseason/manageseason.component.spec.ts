import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ManageseasonComponent } from './manageseason.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../../shared.module';
import { SeasonService } from '../../../services/season.service';
import { SeasonState } from '../../../../api';

describe('ManageseasonComponent', () => {
  let component: ManageseasonComponent;
  let fixture: ComponentFixture<ManageseasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [ManageseasonComponent]
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

  it('should call seasonService.loadSeasons with SeasonState.Preparation on loadAllSeasonInPrep',
    async(() => {
      const seasonServiceSpy = spyOn(TestBed.get(SeasonService), 'loadSeasons');
      component.loadAllSeasonInPrep();
      expect(seasonServiceSpy).toHaveBeenCalledWith(SeasonState.Preparation);
    }));
});
