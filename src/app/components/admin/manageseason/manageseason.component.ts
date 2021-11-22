import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material/select';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { TranslateService } from '@ngx-translate/core';
import { TeamService } from 'src/app/services/team.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AllSeasonsList, Match,
  MatchPlan, MatchPlanGQL, CreateMatchesForSeasonGQL, RemoveTeamFromSeasonGQL,
  AddTeamToSeasonGQL, DatePeriod, StartSeasonGQL, AllSeasonsListGQL, RescheduleMatchDayGQL, MatchDay, EndSeasonGQL, Season
} from '../../../../api/graphql';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { LocalStorage } from 'ngx-webstorage';
import { DateAdapter } from '@angular/material/core';

const MANAGE_SEASON_KEY = 'MANAGE_SEASON_ID_KEY';
const TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  matchesInSeason: Match.Fragment[];

  seasonList: Observable<AllSeasonsList.AllSeasons[]>;
  manageSeason: Observable<MatchPlan.Season>;

  @LocalStorage(MANAGE_SEASON_KEY)
  manageSeasonStore: MatchPlan.Season;

  constructor(
    public seasonService: SeasonService,
    public teamService: TeamService,
    public i18Service: I18Service,
    private translateService: TranslateService,
    private matchPlanGQL: MatchPlanGQL,
    private allSeasonsListGQL: AllSeasonsListGQL,
    private notificationService: NotificationService,
    private endSeasonGQL: EndSeasonGQL,
    private dateAdapter: DateAdapter<any>,
  ) {
    this.translateService.onLangChange.subscribe(
      (lang) => {
        this.dateAdapter.setLocale(lang);
      }
    );
    this.dateAdapter.setLocale(this.translateService.currentLang);
    this.seasonList = this.allSeasonsListGQL.watch().valueChanges.pipe(
      map(
        ({ data }) => {
          return data.allSeasons.sort(
            (a, b) => {
              const aState = a.state.toLocaleLowerCase();
              const bState = b.state.toLocaleLowerCase();
              if (aState > bState) {
                return -1;
              }
              if (aState < bState) {
                return 1;
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

  async ngOnInit() {
    if (this.manageSeasonStore) {
      this.manageSeasonChanged({value: this.manageSeasonStore.id, source: null});
    }
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
      id: this.manageSeasonStore.id
    }).valueChanges.pipe(
      map(({ data }) => {
        if (data.season.teams) {
          data.season.teams = data.season.teams.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
        }
        return data.season;
      })
    );
  }

  selectedTabChanged(event: MatTabChangeEvent, season: MatchPlan.Season) {
    switch (event.index) {
      case 1:
      case 3:
        // if (season.match_days) {
        //   this.events = season.match_days.map(
        //     (matchDay) => (
        //       {
        //         allDay: true,
        //         title: `${matchDay.number}. Spieltag`,
        //         matchDayIndex: matchDay.number - 1,
        //         matchDayId: matchDay.id,
        //         start: new Date(matchDay.start_date),
        //         end: new Date(matchDay.end_date),
        //       })
        //   ).concat(this.events);
        // }
        break;
    }
  }

  async startSeason() {
    try {
      await this.seasonService.startSeason(this.manageSeasonStore.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'), error);
    }
  }

  async endSeason() {
    try {
      await this.endSeasonGQL.mutate({
        season_id: this.manageSeasonStore.id
      }, {
        refetchQueries: [
          {
            query: this.allSeasonsListGQL.document
          }
        ]
      }).toPromise();
      this.notificationService.showSuccessNotification(this.translateService.instant('END_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('END_SEASON_ERROR'), error);
    }
  }

}
