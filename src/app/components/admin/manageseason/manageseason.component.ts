import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange, MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { TeamService } from 'src/app/services/team.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AllSeasonsList, Match,
  MatchPlan, MatchPlanGQL, CreateMatchesForSeasonGQL, RemoveTeamFromSeasonGQL,
  AddTeamToSeasonGQL, DatePeriod, StartSeasonGQL, AllSeasonsListGQL, RescheduleMatchDayGQL, MatchDay
} from '../../../../api/graphql';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  matchesInSeason: Match.Fragment[];

  newMatchDays: DatePeriod[];
  fromToOffset = 2;
  betweenMatchDaysOffset = 7;

  seasonList: Observable<AllSeasonsList.AllSeasons[]>;
  manageSeason: Observable<MatchPlan.Season>;
  manageSeasonId: string;

  constructor(
    public seasonService: SeasonService,
    public teamService: TeamService,
    public i18Service: I18Service,
    private translateService: TranslateService,
    private matchesQL: CreateMatchesForSeasonGQL,
    private matchPlanGQL: MatchPlanGQL,
    private removeTeamGQL: RemoveTeamFromSeasonGQL,
    private addTeamGQL: AddTeamToSeasonGQL,
    private startSeasonGQL: StartSeasonGQL,
    private allSeasonsListGQL: AllSeasonsListGQL,
    private rescheduleMatchDayGQL: RescheduleMatchDayGQL,
    private notificationService: NotificationService
  ) {
    this.seasonList = this.allSeasonsListGQL.watch().valueChanges.pipe(
      map(
        ({ data }) => {
          return data.allSeasons.sort(
            (a, b) => {
              const aState = a.state.toLocaleLowerCase();
              const bState = b.state.toLocaleLowerCase();
              if (aState > bState) {
                return 1;
              }
              if (aState < bState) {
                return -1;
              }
              const aName = a.name.toLocaleLowerCase();
              const bName = b.name.toLocaleLowerCase();
              if (aName > bName) {
                return 1;
              }
              if (aName < bName) {
                return -1;
              }
            });
        })
    );
  }

  ngOnInit() {
  }

  async addNewSeason(seasonName: string) {
    try {
      await this.seasonService.createSeason(seasonName);
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_SEASON_ERROR'), error);
    }
  }

  manageSeasonChanged(event: MatSelectChange) {
    this.manageSeason = this.matchPlanGQL.watch({
      id: event.value
    }).valueChanges.pipe(
      map(({ data }) => {
        if (data.season.teams) {
          data.season.teams = data.season.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }
        return data.season;
      })
    );
    delete this.newMatchDays;
  }

  async addTeamToSeason(teamId: string) {
    if (this.manageSeason) {
      try {
        await this.addTeamGQL.mutate(
          {
            season_id: this.manageSeasonId,
            team_id: teamId
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: { id: this.manageSeasonId }
              }
            ]
          }
        ).toPromise();
        this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_SUCCESS'));
      } catch (error) {
        this.notificationService.showErrorNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_ERROR'));
      }
    }
  }

  async removeTeamFromSeason(teamId: string) {
    if (this.manageSeason) {
      try {
        await this.removeTeamGQL.mutate(
          {
            season_id: this.manageSeasonId,
            team_id: teamId
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: { id: this.manageSeasonId }
              }
            ]
          }
        ).toPromise();
        this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_REMOVED_SEASON_SUCCESS'));
      } catch (error) {
        this.notificationService.showErrorNotification(this.translateService.instant('TEAM_REMOVED_SEASON_ERROR'), error);
      }
    }
  }

  selectedTabChanged(event: MatTabChangeEvent, season: MatchPlan.Season) {
    switch (event.index) {
      case 1:
        if (season.match_days) {
          this.newMatchDays = season.match_days.map((matchDay) => ({ from: matchDay.start_date, to: matchDay.end_date }));
        }
        break;
    }
  }

  createMatchDays(startDate: any, length: number, oldMatchDays: any) {
    this.newMatchDays = new Array<DatePeriod>();
    if (length % 2 !== 0) {
      length += 1;
    }
    for (let i = 0; i < length - 1; i++) {
      const dp = <DatePeriod>{};
      dp.from = new Date(startDate.value);
      dp.from.setDate(dp.from.getDate() + (i * this.betweenMatchDaysOffset));
      dp.to = new Date(dp.from);
      dp.to.setDate(dp.to.getDate() + this.fromToOffset);
      this.newMatchDays.push(dp);
    }
  }

  sendMatchDays() {
    try {
      this.matchesQL.mutate(
        {
          season_id: this.manageSeasonId,
          dates: this.newMatchDays
        },
        {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.manageSeasonId }
            }
          ]
        }
      ).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_MATCH_DAYS_ERROR'), error);
    }
  }

  async startSeason() {
    try {
      await this.startSeasonGQL.mutate(
        {
          id: this.manageSeasonId
        },
        {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.manageSeasonId }
            }
          ]
        }
      ).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'), error);
    }
  }

  setMatchDayFromDate(index: number, date: any, matchDays: MatchDay.Fragment[]) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = <DatePeriod>{};
    }
    this.newMatchDays[index].from = date.value;
    if (matchDays) {
      const matchDayId = matchDays.find(x => x.number === (index + 1)).id;
      this.rescheduleMatchDay(matchDayId, { from: this.newMatchDays[index].from, to: this.newMatchDays[index].to });
    }
  }

  setMatchDayToDate(index: number, date: any, matchDays: MatchDay.Fragment[]) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = <DatePeriod>{};
    }
    this.newMatchDays[index].to = date.value;
    if (matchDays) {
      const matchDayId = matchDays.find(x => x.number === (index + 1)).id;
      this.rescheduleMatchDay(matchDayId, { from: this.newMatchDays[index].from, to: this.newMatchDays[index].to });
    }
  }

  async rescheduleMatchDay(matchDayId: string, period: DatePeriod) {
    try {
      await this.rescheduleMatchDayGQL.mutate(
        {
          match_day_id: matchDayId,
          date_period: period
        }
      ).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_ERROR'), error);
    }
  }
}
