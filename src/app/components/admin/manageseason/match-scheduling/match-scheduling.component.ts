import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PitchService } from '../../../../services/pitch.service';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, map, switchMapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { I18Service } from '../../../../services/i18.service';
import { MatchAppointment, MatchDay, MatchPlan, Pitch, Team } from 'src/api/graphql';
import { MatchService } from 'src/app/services/match.service';
import { CalendarOptions } from '@fullcalendar/angular';
import * as dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { CalendarService, IMatchDayEvent } from 'src/app/services/calendar.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
dayjs.extend(isSameOrAfter);


@Component({
  selector: 'app-match-scheduling',
  templateUrl: './match-scheduling.component.html',
  styleUrls: ['./match-scheduling.component.css']
})
export class MatchSchedulingComponent implements OnInit, OnChanges {

  @Input() manageSeason: MatchPlan.Season;

  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    aspectRatio: 3,
    expandRows: true,
    firstDay: 1,
    editable: false,
    events: [],
  };

  get matchAppointments(): MatchAppointment[] {
    return (this.calendarOptions.events as IMatchDayEvent[]).filter(x => !!x.match).map(
      (event) => event.match,
    );
  }

  matchDaySeries: {matchSeriesId: number, time: string, pitch: Pitch.Fragment, matchDay: MatchDay.Fragment, unavailableTeams: string, kickoff: Date, daysOffset: number}[] = [];

  matchAppointmentFormGroup = new FormGroup({
    pitch: new FormControl(),
    time: new FormControl(),
    matchDay: new FormControl(),
    unavailableTeams: new FormControl([]),
    daysOffset: new FormControl(0),
  });

  get kickoffDay(): Date|null {
    if (this.matchAppointmentFormGroup.value.matchDay?.start_date && this.matchAppointmentFormGroup.value.time) {
      const h = this.matchAppointmentFormGroup.value.time.split(':')[0];
      const m = this.matchAppointmentFormGroup.value.time.split(':')[1];
      return dayjs(this.matchAppointmentFormGroup.value.matchDay.start_date).add(this.matchAppointmentFormGroup.value.daysOffset, 'day').hour(h).minute(m).toDate();
    }
    return null;
  }

  filteredPitches: Observable<Pitch.Fragment[]>;

  startmatchDay = 0;

  get matchesCount(): number {
    // let count = 0;
    // for (let md of this.manageSeason.match_days) {
    //   count += md.matches.length;
    // }

    return this.manageSeason.match_days[0].matches.length;
  }

  constructor(
    public pitchService: PitchService,
    private matchService: MatchService,
    private calendarService: CalendarService,
    public i18Service: I18Service,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.filteredPitches = this.matchAppointmentFormGroup.controls.pitch.valueChanges.pipe(
      startWith<string | Pitch.Fragment>(''),
      map(value => typeof value === 'string' ? value : value.label),
      switchMapTo(this.pitchService.allPitches),
      map(x => {
        return (this.matchAppointmentFormGroup.controls.pitch.value && (typeof this.matchAppointmentFormGroup.controls.pitch.value === 'string')) ?
          x.filter(y => y.label.toLowerCase().includes(this.matchAppointmentFormGroup.controls.pitch.value.toLowerCase())) : x;
      })
    );
    this.calendarService.getEvents(this.manageSeason).subscribe(
      (events) => {
        this.calendarOptions.events = events.map(
          x => ({...x, display: 'background'})
        );
      }
    );
    this.calendarOptions.locale = this.i18Service.currentLang;
  }

  ngOnChanges() {
  }

  displayPitch(pitch?: Pitch.Fragment): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  addMatchAppointment() {


    const matchSeriesId = (this.calendarOptions.events as IMatchDayEvent[]).length + 1;
    
    this.matchDaySeries.push({
      ...this.matchAppointmentFormGroup.value,
      matchSeriesId,
      kickoff: this.kickoffDay,
      unavailableTeams: this.matchAppointmentFormGroup.value.unavailableTeams.map(x => x.name).join(','),
    });

    const match = {
      kickoff: this.kickoffDay,
      pitch_id: this.matchAppointmentFormGroup.value.pitch.id,
      unavailable_team_ids: this.matchAppointmentFormGroup.value.unavailableTeams.map(x => x.id),
    };
    (this.calendarOptions.events as IMatchDayEvent[]).push({
      allDay: false,
      start: match.kickoff,
      title: `${this.matchAppointmentFormGroup.value.pitch.label}`,
      match,
      matchSeriesId,
    });
  }

  async saveAllMatchdays() {
    try {
      await this.matchService.scheduleAllMatchesInSeason(this.manageSeason.id, this.matchAppointments);
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_MATCH_DAYS_ERROR'), error);
    }
  }

  async saveMatchday() {
    try {
      await this.matchService.scheduleAllMatchesForMatchday(
        this.matchAppointmentFormGroup.value.matchDay.id,
        this.manageSeason.id,
        this.matchAppointments);
      this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
    } catch (error) {
      this.notificationService.showErrorNotification(this.translateService.instant('CREATE_MATCH_DAYS_ERROR'), error);
    }
  }

  removeSeries(matchSeriesId: number) {
    this.calendarOptions.events = (this.calendarOptions.events as IMatchDayEvent[]).filter(
      (x) => x.matchSeriesId !== matchSeriesId,
    );

    this.matchDaySeries = this.matchDaySeries.filter(
      (x) => x.matchSeriesId !== matchSeriesId,
    );
  }
}
