import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PitchService } from '../../../../services/pitch.service';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { I18Service } from '../../../../services/i18.service';
import * as momentjs from 'moment';
import { MatchAppointment, MatchPlan, Pitch, Team } from 'src/api/graphql';
import { MatchService } from 'src/app/services/match.service';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-match-scheduling',
  templateUrl: './match-scheduling.component.html',
  styleUrls: ['./match-scheduling.component.css']
})
export class MatchSchedulingComponent implements OnInit, OnChanges {

  calendarOptions: CalendarOptions;

  @Input() manageSeason: MatchPlan.Season;
  @Input() events: { allDay: boolean, title: string, start: Date }[];

  matchAppointments: MatchAppointment[] = new Array<MatchAppointment>();

  filteredPitches: Observable<Pitch.Fragment[]>;
  newMatchPitch: FormControl = new FormControl();
  newMatchDate: FormControl = new FormControl();

  startmatchDay = 0;

  get matchDayLength(): number {
    return this.manageSeason.match_days[0].matches.length;
  }

  constructor(
    public pitchService: PitchService,
    private matchService: MatchService,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    this.filteredPitches = this.newMatchPitch.valueChanges.pipe(
      startWith<string | Pitch.Fragment>(''),
      map(value => typeof value === 'string' ? value : value.label),
      switchMapTo(this.pitchService.allPitches),
      map(x => {
        return (this.newMatchPitch.value && (typeof this.newMatchPitch.value === 'string')) ?
          x.filter(y => y.label.toLowerCase().includes(this.newMatchPitch.value.toLowerCase())) : x;
      })
    );
    this.calendarOptions.locale = this.i18Service.currentLang;
    this.events = this.events.map(x => {return {...x, display: 'background'}} );
  }

  ngOnChanges() {
  }

  displayPitch(pitch?: Pitch.Fragment): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  addMatchAppointment() {

    const newMatch = {
      kickoff: this.newMatchDate.value,
      pitch_id: this.newMatchPitch.value.id,
      unavailable_team_ids: []
    };

    this.matchAppointments.push(newMatch);

    this.events.push({
      allDay: false,
      start: newMatch.kickoff,
      title: `${this.newMatchPitch.value.label}`,
    });
  }

  async saveMatches() {
    try {
      await this.matchService.scheduleAllMatchesInSeason(this.manageSeason.id, this.matchAppointments);
    } catch(error) {
      console.error(error);
    }
  }
  // addKickoffDateToPitch(offset: number, event: any) {
  //   if (this.newMatchPitch.value) {
  //     const newElement: IPossibleKickoffs = {
  //       index: this.possibleKickoffs.length,
  //       pitch: this.newMatchPitch.value,
  //       kickoffTime: event.value,
  //       daysOffset: +offset,
  //       teamsCanPlay: this.manageSeason.teams.map(x => <ITeamCanPlayAtDate>{ team: x, canPlay: true })
  //     };
  //     this.possibleKickoffs.push(newElement);
  //   }
  // }

  // removePair(index: number) {
  //   this.matchAppointments = this.matchAppointments.filter(x => x.index !== +index);
  // }

  // scheduleMatches() {

  //   this.manageSeason.match_days.filter( x => x.number >= this.startmatchDay).forEach(
  //     (matchDay) => {
  //       let possibleKickoffs: IPossibleKickoffs[] = JSON.parse(JSON.stringify(this.possibleKickoffs));
  //       matchDay.matches.forEach(
  //         (match) => {
  //           if (possibleKickoffs) {
  //             possibleKickoffs = this.shuffle(possibleKickoffs);
  //             let list = possibleKickoffs.filter(x => x.teamsCanPlay.find(y => y.team.id === match.home_team.id).canPlay);
  //             list = list.filter(x => x.teamsCanPlay.find(y => y.team.id === match.guest_team.id).canPlay);
  //             if (list[0]) {
  //               if (!match.pitch && !match.kickoff) {
  //                 match.pitch = list[0].pitch;
  //                 const date = momentjs(matchDay.start_date).add(list[0].daysOffset, 'd').toDate();
  //                 date.setUTCHours(new Date(list[0].kickoffTime).getUTCHours());
  //                 date.setUTCMinutes(new Date(list[0].kickoffTime).getUTCMinutes());
  //                 match.kickoff = date.toISOString();
  //               }
  //               possibleKickoffs = possibleKickoffs.filter(x => x.index !== list[0].index);
  //             } else {
  //               alert(`${matchDay.id}. Spieltag - Spiel ${match.home_team.name} - ${match.guest_team.name} konnte nicht terminiert werden`);
  //               console.error('iwas passt nicht');
  //             }
  //           }
  //         }
  //       );
  //     }
  //   );
  // }

  // shuffle(a) {
  //   for (let i = a.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [a[i], a[j]] = [a[j], a[i]];
  //   }
  //   return a;
  // }
}
