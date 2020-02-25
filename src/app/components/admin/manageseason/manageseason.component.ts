import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { PublicHolidaysService } from 'src/app/services/public-holidays.service';

const MANAGE_SEASON_KEY = 'MANAGE_SEASON_ID_KEY';

@Component({
  selector: 'app-manageseason',
  templateUrl: './manageseason.component.html',
  styleUrls: ['./manageseason.component.css']
})
export class ManageseasonComponent implements OnInit {

  calendarPlugins = [
    dayGridPlugin,
    interactionPlugin,
  ];
  events: any[];
  holidays: any[];

  matchesInSeason: Match.Fragment[];

  newMatchDays: DatePeriod[];
  fromToOffset = 2;
  betweenMatchDaysOffset = 7;

  seasonList: Observable<AllSeasonsList.AllSeasons[]>;
  manageSeason: Observable<MatchPlan.Season>;

  @LocalStorage(MANAGE_SEASON_KEY)
  manageSeasonStore: MatchPlan.Season = null;

  seasonStartDate: Date;

  constructor(
    public seasonService: SeasonService,
    public teamService: TeamService,
    public i18Service: I18Service,
    private translateService: TranslateService,
    private matchesQL: CreateMatchesForSeasonGQL,
    private matchPlanGQL: MatchPlanGQL,
    private removeTeamGQL: RemoveTeamFromSeasonGQL,
    private addTeamGQL: AddTeamToSeasonGQL,
    private allSeasonsListGQL: AllSeasonsListGQL,
    private rescheduleMatchDayGQL: RescheduleMatchDayGQL,
    private notificationService: NotificationService,
    private endSeasonGQL: EndSeasonGQL,
    private dateAdapter: DateAdapter<any>,
    private holidaysService: PublicHolidaysService,
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

  ngOnInit() {
    if (this.manageSeasonStore) {
      this.manageSeasonChanged({value: this.manageSeasonStore.id, source: null});
    }

    this.holidaysService.publicHolidays(2020).subscribe(
      (result) => {
        this.holidays = result;
      }
    );
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
    delete this.newMatchDays;
  }

  async addTeamToSeason(teamId: string) {
    if (this.manageSeason) {
      try {
        await this.addTeamGQL.mutate(
          {
            season_id: this.manageSeasonStore.id,
            team_id: teamId
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: { id: this.manageSeasonStore.id }
              }
            ]
          }
        ).toPromise();
        this.notificationService.showSuccessNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_SUCCESS'));
      } catch (error) {
        this.notificationService.showErrorNotification(this.translateService.instant('TEAM_ADDED_TO_SEASON_ERROR'), error);
      }
    }
  }

  async removeTeamFromSeason(teamId: string) {
    if (this.manageSeason) {
      try {
        await this.removeTeamGQL.mutate(
          {
            season_id: this.manageSeasonStore.id,
            team_id: teamId
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: { id: this.manageSeasonStore.id }
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

  eventDrop(event) {
    const matchDayIndex = event.event._def.extendedProps.matchDayIndex;
    for (const matchDay of this.events.filter(
      x => x.title.includes('Spieltag') && x.matchDayIndex >= matchDayIndex)) {

      const md = this.events.indexOf(matchDay);
      this.events[md].start.setDate((matchDay.start as Date).getDate() + event.delta.days);
      this.events[md].end.setDate((matchDay.end as Date).getDate() + event.delta.days);
    }
  }

  createMatchDays(length: number) {
    const events = new Array<any>();
    if (length % 2 !== 0) {
      length += 1;
    }
    for (let i = 0; i < length - 1; i++) {
      const dp = <DatePeriod>{};
      dp.from = new Date(this.seasonStartDate);
      dp.from.setDate(dp.from.getDate() + (i * this.betweenMatchDaysOffset));
      dp.to = new Date(dp.from);
      dp.to.setDate(dp.to.getDate() + this.fromToOffset);
      events.push({
        allDay: true,
        title: `${i + 1}.Spieltag`,
        matchDayIndex: i,
        start: dp.from,
        end: dp.to,
      });
    }

    this.events = events.concat(this.holidays);
  }

  async sendMatchDays() {
    try {
      await this.matchesQL.mutate(
        {
          season_id: this.manageSeasonStore.id,
          dates: this.newMatchDays
        },
        {
          refetchQueries: [
            {
              query: this.matchPlanGQL.document,
              variables: { id: this.manageSeasonStore.id }
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
      await this.seasonService.startSeason(this.manageSeasonStore.id);
      this.notificationService.showSuccessNotification(this.translateService.instant('START_SEASON_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('START_SEASON_ERROR'), error);
    }
  }

  async setMatchDayFromDate(index: number, date: any, matchDays: MatchDay.Fragment[]) {

    try {
      if (matchDays) {
        const matchDayId = matchDays.find(x => x.number === (index + 1)).id;
        await this.rescheduleMatchDay(matchDayId, { from: date.value, to: this.newMatchDays[index].to });
      }
      if (!this.newMatchDays[index]) {
        this.newMatchDays[index] = <DatePeriod>{};
      }
      this.newMatchDays[index].from = date.value;
    } catch (error) {

    }
  }

  async setMatchDayToDate(index: number, date: any, matchDays: MatchDay.Fragment[]) {
    try {
      if (matchDays) {
        const matchDayId = matchDays.find(x => x.number === (index + 1)).id;
        await this.rescheduleMatchDay(matchDayId, { from: this.newMatchDays[index].from, to: date.value });
      }
      if (!this.newMatchDays[index]) {
        this.newMatchDays[index] = <DatePeriod>{};
      }
      this.newMatchDays[index].to = date.value;
    } catch (error) {

    }
  }

  async rescheduleMatchDay(matchDayId: string, period: DatePeriod): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          if (new Date(period.from) > new Date(period.to)) {
            throw new Error(this.translateService.instant('RESCHEDULE_MATCH_DAY_ERROR_FROM_TO_SMALL'));
          }
          await this.rescheduleMatchDayGQL.mutate(
            {
              match_day_id: matchDayId,
              date_period: {
                from: new Date(period.from).toDateString(),
                to: new Date(period.to).toDateString()
              }
            },
            {
              refetchQueries: [
                {
                  query: this.matchPlanGQL.document,
                  variables: { id: this.manageSeasonStore.id }
                }
              ]
            }
          ).toPromise();
          this.notificationService.showSuccessNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_SUCCESS'));
          resolve();
        } catch (error) {
          this.notificationService.showErrorNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_ERROR'), error);
          reject();
        }
      }
    );
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
