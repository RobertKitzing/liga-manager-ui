import { Component, Input, OnInit } from '@angular/core';
import { DatePeriod, SeasonFragment } from 'src/api/graphql';
import * as dayjs from 'dayjs';
import { CalendarOptions, EventDropArg } from '@fullcalendar/angular';
import { CalendarService, IMatchDayEvent } from 'src/app/services/calendar.service';
import { I18Service } from 'src/app/services/i18.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { SeasonService } from 'src/app/services/season.service';
import { FormControl, Validators } from '@angular/forms';
import { firstValueFrom, Observable, switchMap, tap } from 'rxjs';
import { EventResizeDoneArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-manage-match-days',
  templateUrl: './manage-match-days.component.html',
  styleUrls: ['./manage-match-days.component.css']
})
export class ManageMatchDaysComponent implements OnInit {

  manageSeason: Observable<SeasonFragment> = this.seasonService.manageSeason.pipe(
    switchMap(
      (manageSeason) => this.seasonService.getSeason({id: manageSeason.id}),
    ),
    tap(
      async (manageSeason) => {
        this.calendarOptions.events = await firstValueFrom(
          this.calendarService.getEvents(manageSeason.match_days)
        );
        if (manageSeason.match_days) {
          this.seasonStartDate.setValue(manageSeason.match_days[0].start_date);
        }
      }
    ),
  );
  
  seasonStartDate = new FormControl(null, [Validators.required]);
 
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    aspectRatio: 3,
    expandRows: true,
    firstDay: 1,
    editable: true,
    eventDrop: this.eventDrop.bind(this),
    eventResize: this.eventResize.bind(this),
    events: [],
  };
  
  secondHalf: boolean;
  fromToOffset = 2;
  betweenMatchDaysOffset = 7;

  get matchDays(): DatePeriod[] {
    const days: DatePeriod[] = (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.matchDayIndex !== -1).map(
      (event) => ({
        from: dayjs(event.start).format('YYYY-MM-DD'),
        to: dayjs(event.end).format('YYYY-MM-DD'),
      })
    );
    return days;
  }

  constructor(
    private calendarService: CalendarService,
    private i18Service: I18Service,
    private seasonService: SeasonService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.calendarOptions.locale = this.i18Service.currentLang;
  }

  createMatchDays(manageSeason: SeasonFragment) {
    const events = (this.calendarOptions.events as IMatchDayEvent[]).filter(x => !x.title.includes('Spieltag'));
    this.calendarOptions.events = events;
    let length = manageSeason.teams.length;
    if (length % 2 !== 0) {
      length += 1;
    }
    if (this.secondHalf) {
      length = (length * 2) - 1;
    }
    for (let i = 0; i < length - 1; i++) {
      const dp = <DatePeriod>{};
      dp.from = dayjs(this.seasonStartDate.value).add( i * this.betweenMatchDaysOffset, 'day').toDate();
      dp.to = dayjs(dp.from).add(this.fromToOffset, 'day').toDate();
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

  async rescheduleMatchDays(manageSeason: SeasonFragment) {
    for (const matchDay of (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag'))) {
      if (matchDay.matchDayId) {
        await this.rescheduleMatchDay(matchDay.matchDayId, {from: matchDay.start, to: matchDay.end}, manageSeason);
      }
    }
  }

  resizeMatchDays() {
    for (const matchDay of (this.calendarOptions.events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag'))) {
      matchDay.end = dayjs(matchDay.start).add(this.fromToOffset, 'days').toDate();
    }
  }

  async rescheduleMatchDay(match_day_id: string, date_period: DatePeriod, manageSeason: SeasonFragment): Promise<void> {
    return new Promise<void>(
      async (resolve, reject) => {
        try {
          if (new Date(date_period.from) > new Date(date_period.to)) {
            throw new Error(this.translateService.instant('RESCHEDULE_MATCH_DAY_ERROR_FROM_TO_SMALL'));
          }
          await this.seasonService.rescheduleMatchDay({match_day_id, date_period}, manageSeason.id);
          this.notificationService.showSuccessNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_SUCCESS'));
          resolve();
        } catch (error) {
          this.notificationService.showErrorNotification(this.translateService.instant('RESCHEDULE_MATCH_DAY_ERROR'), error);
          reject();
        }
      }
    );
  }

  async saveMatchDays(manageSeason: SeasonFragment) {
    try {
  
      if (!manageSeason.match_days || manageSeason.match_days.length !== this.matchDays.length) {
        await this.seasonService.createMatchesForSeason({
          season_id: manageSeason.id,
          dates: this.matchDays,
        });
      } else {
        this.rescheduleMatchDays(manageSeason);
      }
  
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_MATCH_DAYS_ERROR'), error);
    }
  }

  eventResize(event: EventResizeDoneArg) {
    const events = (this.calendarOptions.events as IMatchDayEvent[]);
    const matchDayIndex = event.event._def.extendedProps.matchDayIndex;
    for (const matchDay of (events as IMatchDayEvent[]).filter(x => x.title.includes('Spieltag') && x.matchDayIndex >= matchDayIndex)) {

      const md = events.indexOf(matchDay);
      events[md].start = dayjs(matchDay.start).add(event.startDelta.days, 'days').toDate();
      events[md].end = dayjs(matchDay.end).add(event.endDelta.days, 'days').toDate();
    }
    this.calendarOptions.events = events;
  }

  eventDrop(event: EventDropArg) {
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
