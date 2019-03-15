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
  AddTeamToSeasonGQL, DatePeriod, StartSeasonGQL
} from '../../../../api/graphql';

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
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private matchesQL: CreateMatchesForSeasonGQL,
    private matchPlanGQL: MatchPlanGQL,
    private removeTeamGQL: RemoveTeamFromSeasonGQL,
    private addTeamGQL: AddTeamToSeasonGQL,
    private startSeasonGQL: StartSeasonGQL
  ) {
    this.seasonList = this.seasonService.seasonsQGL.valueChanges.pipe(
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
    } catch (error) {
      console.error(error);
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
      } catch (error) {
        console.log(error);
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
      } catch (error) {
        console.log(error);
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
    ).subscribe(
      (d) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS')
          },
          panelClass: ['alert', 'alert-success']
        });
      },
      (error) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('CREATE_MATCH_DAYS_ERROR')
          },
          panelClass: ['alert', 'alert-danger']
        });
      }
    );
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
              variables: {id: this.manageSeasonId}
            }
          ]
        }
      ).toPromise();
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('START_SEASON_SUCCESS')
        },
        panelClass: ['alert', 'alert-success']
      });
    } catch (error) {
      this.snackBar.openFromComponent(SnackbarComponent, {
        data: {
          message: this.translateService.instant('START_SEASON_ERROR')
        },
        panelClass: ['alert', 'alert-danger']
      });
    }
  }

  setMatchDayFromDate(index: number, date: any) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = <DatePeriod>{};
    }
    this.newMatchDays[index].from = date.value;
  }

  setMatchDayToDate(index: number, date: any) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = <DatePeriod>{};
    }
    this.newMatchDays[index].to = date.value;
  }
}
