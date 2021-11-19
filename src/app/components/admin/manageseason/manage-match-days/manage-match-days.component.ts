import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CreateMatchesForSeasonGQL, DatePeriod, MatchPlan, MatchPlanGQL, RescheduleMatchDayGQL } from 'src/api/graphql';
import * as dayjs from 'dayjs';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService, IMatchDayEvent } from 'src/app/services/calendar.service';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-manage-match-days',
  templateUrl: './manage-match-days.component.html',
  styleUrls: ['./manage-match-days.component.css']
})
export class ManageMatchDaysComponent implements OnInit {

  @ViewChild(FullCalendarComponent) cal: FullCalendarComponent;

  @Input() manageSeason: MatchPlan.Season;

  calendarOptions: CalendarOptions = {
    firstDay: 1,
    editable: true,
    eventDrop: this.eventDrop.bind(this),
    events: [],
  };
  
  seasonStartDate: Date;
  secondHalf: boolean;
  fromToOffset = 2;
  betweenMatchDaysOffset = 7;

  get matchDays(): DatePeriod[] {
    const days: DatePeriod[] = (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.matchDayIndex !== -1).map(
      (event) => ({
        from: event.start,
        to: event.end,
      })
    );
    return days;
  }

  constructor(
    private calendarService: CalendarService,
    private i18Service: I18Service,
    private createMatchesForSeasonGQL: CreateMatchesForSeasonGQL,
    private rescheduleMatchDayGQL: RescheduleMatchDayGQL,
    private matchPlanGQL: MatchPlanGQL,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.calendarService.getEvents(this.manageSeason).subscribe(
      (events) => {
        this.calendarOptions.events = events;
      }
    );
    this.calendarOptions.locale = this.i18Service.currentLang;
  }

  createMatchDays() {
    const events = new Array<IMatchDayEvent>();
    let length = this.manageSeason.teams.length;
    if (length % 2 !== 0) {
      length += 1;
    }
    if (this.secondHalf) {
      length = (length * 2) - 1;
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
        new: true,
      });
    }
    this.calendarOptions.events = (this.calendarOptions.events as IMatchDayEvent[]).filter(x => !x.new).concat(events);
  }

  async rescheduleMatchDays() {
    try {
      for (const matchDay of (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag'))) {
        await this.rescheduleMatchDay(matchDay.matchDayId, {from: matchDay.start, to: matchDay.end});
      }
    } catch (error) {

    }
  }

  resizeMatchDayOffset() {
    this.createMatchDays();
  }

  resizeMatchDays() {
    for (const matchDay of (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag'))) {
      matchDay.end = dayjs(matchDay.start).add(this.fromToOffset, 'days').toDate();
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
                  variables: { id: this.manageSeason.id }
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

  secondHalfChanged() {
    this.createMatchDays();
  }

  async saveMatchDays() {
    try {
  
      if (!this.manageSeason.match_days) {
        await this.createMatchesForSeasonGQL.mutate(
          {
            season_id: this.manageSeason.id,
            dates: this.matchDays
          },
          {
            refetchQueries: [
              {
                query: this.matchPlanGQL.document,
                variables: { id: this.manageSeason.id }
              }
            ]
          }
        ).toPromise();
      } else {
        this.rescheduleMatchDays();
      }
  
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_MATCH_DAYS_ERROR'), error);
    }
  }

  eventDrop(event) {
    const events = (this.calendarOptions.events as IMatchDayEvent[]);
    const matchDayIndex = event.event._def.extendedProps.matchDayIndex;
    for (const matchDay of (events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag') && x.matchDayIndex >= matchDayIndex)) {

      const md = events.indexOf(matchDay);
      events[md].start = dayjs(matchDay.start).add(event.delta.days, 'days').toDate();
      events[md].end = dayjs(matchDay.end).add(event.delta.days, 'days').toDate();
    }
    this.calendarOptions.events = events;
  }

}
