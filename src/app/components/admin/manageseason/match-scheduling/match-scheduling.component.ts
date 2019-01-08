import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Season, Match_day, Pitch } from '../../../../../api';
import { MatchViewModel } from 'src/app/models/match.viewmodel';
import { MatchService } from 'src/app/services/match.service';
import { PitchService } from '../../../../services/pitch.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { I18Service } from '../../../../services/i18.service';
import * as momentjs from 'moment';

interface IPossibleKickoffs {
  kickoffTime: Date;
  daysOffset: number;
  given: boolean;
  pitch: Pitch;
}

@Component({
  selector: 'app-match-scheduling',
  templateUrl: './match-scheduling.component.html',
  styleUrls: ['./match-scheduling.component.css']
})
export class MatchSchedulingComponent implements OnInit, OnChanges {

  @Input() manageSeason: Season;
  @Input() matchesInSeason: MatchViewModel[];
  @Input() matchDaysInSeason: Match_day[];

  possibleKickoffs: IPossibleKickoffs[] = new Array<IPossibleKickoffs>();
  filteredPitches: Observable<Pitch[]>;
  newMatchPitch: FormControl = new FormControl();

  get matchDayLength(): number {
    return this.matchesInSeason ? this.matchesInSeason.filter(x => x.match_day_id === this.matchDaysInSeason[0].id).length : 0;
  }

  constructor(
    private pitchService: PitchService,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    if (this.pitchService.pitches) {
      this.filteredPitches = this.newMatchPitch.valueChanges
        .pipe(
          startWith<string | Pitch>(''),
          map(value => typeof value === 'string' ? value : value.label),
          map((pitch) => pitch ? this.filterPitches(pitch) : this.pitchService.pitches.slice())
        );
    }
  }

  ngOnChanges() {
  }

  filterPitches(searchTerm: string): Pitch[] {
    return this.pitchService.pitches.filter(p => p.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  getMatchDay(id: string): Match_day {
    return this.matchDaysInSeason.find(t => t.id === id) || new Match_day();
  }

  displayPitch(pitch?: Pitch): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  addKickoffDateToPitch(offset: number, event: any) {
    if (this.newMatchPitch.value) {
      this.possibleKickoffs.push({ pitch: this.newMatchPitch.value, kickoffTime: event.value, daysOffset: +offset, given: false });
      console.log(this.possibleKickoffs);
    }
  }

  scheduleMatches() {

    this.matchDaysInSeason.forEach(
      (matchDay) => {
        let possibleKickoffs: IPossibleKickoffs[] = JSON.parse(JSON.stringify(this.possibleKickoffs));
        const matches = this.matchesInSeason.filter(x => x.match_day_id === matchDay.id);
        matches.forEach(
          (match) => {
            if (possibleKickoffs) {
              possibleKickoffs = this.shuffle(possibleKickoffs);
              if (!match.pitch && !match.kickoff) {
                match.pitch = possibleKickoffs[0].pitch;
                match.kickoff = momentjs(matchDay.start_date).add(possibleKickoffs[0].daysOffset, 'd').toDate();
                match.kickoff.setUTCHours(new Date(possibleKickoffs[0].kickoffTime).getUTCHours());
                match.kickoff.setUTCMinutes(new Date(possibleKickoffs[0].kickoffTime).getUTCMinutes());
                possibleKickoffs.shift();
              }
            }
          }
        );
      }
    );
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
