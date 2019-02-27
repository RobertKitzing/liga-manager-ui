import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { Season, SeasonState, Team, Client, CreateSeasonBody, CreateMatchDaysBody, Date_period, Match_day } from '../../../../api';
import { MatSelectChange, MatTabChangeEvent, MatSnackBar } from '@angular/material';
import { MatchService } from '../../../services/match.service';
import { MatchViewModel } from '../../../models/match.viewmodel';
import { SnackbarComponent } from '../../shared/snackbar/snackbar.component';
import { TranslateService } from '@ngx-translate/core';
import { TeamService } from 'src/app/services/team.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AllSeasonsList, MatchesGQL } from '../../../../api/graphql';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  teamsInSeason: Team[];
  allTeams: Team[];
  matchesInSeason: MatchViewModel[];
  manageSeason: Season;
  matchDayCounter: number[];
  newMatchDays: Date_period[];
  matchDaysInSeason: Match_day[];
  fromToOffset = 2;
  betweenMatchDaysOffset = 7;
  seasonList: Observable<AllSeasonsList.AllSeasons[]>;

  constructor(
    public seasonService: SeasonService,
    private teamService: TeamService,
    private matchService: MatchService,
    private apiClient: Client,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private matchesQL: MatchesGQL
  ) {

    this.seasonList = this.seasonService.seasonsQGL.valueChanges.pipe(
      map(
        ({ data }) => {
          data.allSeasons.sort(
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
              // a.state.toLowerCase() > b.state.toLowerCase() ? 1 : -1
            });
          return data.allSeasons;
        })
    );
  }

  async ngOnInit() {
    this.loadAllSeason();
    this.loadAllTeams();
  }

  async loadAllSeason() {
    this.seasonService.seasonsQGL.refetch();
  }

  async loadAllTeams() {
    this.allTeams = await this.teamService.loadAllTeams();
  }

  addNewSeason(seasonName: string) {
    this.seasonService.createSeason(seasonName).then(
      () => {
        this.loadAllSeason();
      }
    ).catch(
      (error) => {
        console.error(error);
      }
    );
  }

  manageSeasonChanged(event: MatSelectChange) {
    this.manageSeason = event.value;
    this.getTeamsInManageSeason();
  }

  getTeamsInManageSeason() {
    this.apiClient.getTeamsInSeason(this.manageSeason.id).subscribe(
      (teams) => {
        this.teamsInSeason = teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      }
    );
  }

  addTeamToSeason(teamId: string) {
    if (this.manageSeason) {
      this.apiClient.addTeamToSeason(this.manageSeason.id, teamId).subscribe(
        (t) => {
          this.getTeamsInManageSeason();
        }
      );
    }
  }

  removeTeamFromSeason(teamId: string) {
    if (this.manageSeason) {
      this.apiClient.removeTeamFromSeason(this.manageSeason.id, teamId).subscribe(
        (t) => {
          this.getTeamsInManageSeason();
        }
      );
    }
  }

  createMatchDays(startDate: any) {
    this.newMatchDays = new Array<Date_period>();
    for (let i = 0; i < this.teamsInSeason.length - 1; i++) {
      const dp = new Date_period();
      dp.from = new Date(startDate.value);
      dp.from.setDate(dp.from.getDate() + (i * this.betweenMatchDaysOffset));
      dp.to = new Date(dp.from);
      dp.to.setDate(dp.to.getDate() + this.fromToOffset);
      this.newMatchDays.push(dp);
    }
  }

  sendMatchDays() {
    // const body = new CreateMatchDaysBody();
    // body.dates = this.newMatchDays;
    this.matchesQL.mutate(
      {
        season_id: this.manageSeason.id,
        dates: this.newMatchDays
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

  getMatchDay(id: string): Match_day {
    return this.matchDaysInSeason.find(t => t.id === id) || new Match_day();
  }

  startSeason() {
    this.apiClient.startSeason(this.manageSeason.id).subscribe(
      () => {
        this.seasonService.seasonCreated.next();
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('START_SEASON_SUCCESS')
          },
          panelClass: ['alert', 'alert-success']
        });
      },
      (error) => {
        this.snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: this.translateService.instant('START_SEASON_ERROR')
          },
          panelClass: ['alert', 'alert-danger']
        });
      }
    );
  }

  setMatchDayFromDate(index: number, date: any) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = new Date_period();
    }
    this.newMatchDays[index].from = date.value;
  }

  setMatchDayToDate(index: number, date: any) {
    if (!this.newMatchDays[index]) {
      this.newMatchDays[index] = new Date_period();
    }
    this.newMatchDays[index].to = date.value;
  }

  onTabChanged(event: MatTabChangeEvent) {
    switch (event.index) {
      case 1:
        break;
      case 2:
      case 3:
        break;
    }
  }
}
