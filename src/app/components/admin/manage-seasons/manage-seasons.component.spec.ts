import { ComponentFixture, TestBed, waitForAsync as  } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ManageSeasonsComponent } from './manage-seasons.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { SeasonService } from '../../../services/season.service';
import { SeasonState, Team, Client, CreateSeasonBody, Season } from '../../../../api';
import { TeamService } from '../../../services/team.service';
import { of } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { MatchSchedulingComponent } from './match-scheduling/match-scheduling.component';

describe('ManageSeasonsComponent', () => {
  let component: ManageSeasonsComponent;
  let fixture: ComponentFixture<ManageSeasonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [
        ManageSeasonsComponent,
        MatchSchedulingComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call seasonService.loadSeasons on loadAllSeason',
    waitForAsync(() => {
      const seasonServiceSpy = spyOn(TestBed.get(SeasonService), 'loadSeasons');
      component.loadAllSeason();
      expect(seasonServiceSpy).toHaveBeenCalledWith();
    }));

  it('should call teamService.loadAllTeams on loadAllTeams() and set this.allTeams',
    async () => {
      const testTeams: Team[] = new Array<Team>();
      testTeams.push(<Team>{ name: 'TestName' });
      const teamServiceSpy = spyOn(TestBed.get(TeamService), 'loadAllTeams').and.returnValue(testTeams);
      await component.loadAllTeams();
      fixture.detectChanges();
      expect(teamServiceSpy).toHaveBeenCalled();
      expect(component.allTeams).toBe(testTeams);
    });

  it('should call apiClient.createSeason on addNewSeason() and reload SeasonsInPrep', () => {
    const testSeasonname = 'test';
    const createSeasonSpy = spyOn(TestBed.get(Client), 'createSeason').and.returnValue(of(true));
    const componentSpy = spyOn(component, 'loadAllSeason');
    component.addNewSeason(testSeasonname);
    expect(createSeasonSpy).toHaveBeenCalledWith(new CreateSeasonBody({ name: testSeasonname }));
    expect(componentSpy).toHaveBeenCalled();
  });

  it('should reload Teams in Season && set this.manageSeason on manageSeasonChanged()', () => {
    const testSeason = new Season();
    testSeason.name = 'testSeason';
    const changeEvent: MatSelectChange = <MatSelectChange>{ value: testSeason };
    const spy = spyOn(component, 'getTeamsInManageSeason');

    component.manageSeasonChanged(changeEvent);

    expect(component.manageSeason).toBe(testSeason);
    expect(spy).toHaveBeenCalled();
  });
});
