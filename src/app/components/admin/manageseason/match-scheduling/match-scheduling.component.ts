import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Season, Match_day, Pitch, Team, Client, ScheduleMatchBody, LocateMatchBody } from '../../../../../api';
import { MatchViewModel } from 'src/app/models/match.viewmodel';
import { MatchService } from 'src/app/services/match.service';
import { PitchService } from '../../../../services/pitch.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { I18Service } from '../../../../services/i18.service';
import * as momentjs from 'moment';
import { TeamService } from '../../../../services/team.service';

interface IPossibleKickoffs {
  index: number;
  kickoffTime: Date;
  daysOffset: number;
  pitch: Pitch;
  teamsCanPlay: ITeamCanPlayAtDate[];
}

interface ITeamCanPlayAtDate {
  team: Team;
  canPlay: boolean;
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
  @Input() teamsInSeason: Team[];

  possibleKickoffs: IPossibleKickoffs[] = new Array<IPossibleKickoffs>();
  filteredPitches: Observable<Pitch[]>;
  newMatchPitch: FormControl = new FormControl();
  startmatchDay: number;

  get matchDayLength(): number {
    return this.matchesInSeason ? this.matchesInSeason.filter(x => x.match_day_id === this.matchDaysInSeason[0].id).length : 0;
  }

  constructor(
    private pitchService: PitchService,
    public i18Service: I18Service,
    private client: Client
  ) { }

  ngOnInit() {
    // if (this.pitchService.pitches) {
    //   this.filteredPitches = this.newMatchPitch.valueChanges
    //     .pipe(
    //       startWith<string | Pitch>(''),
    //       map(value => typeof value === 'string' ? value : value.label),
    //       map((pitch) => pitch ? this.filterPitches(pitch) : this.pitchService.pitches.slice())
    //     );
    // }
  }

  ngOnChanges() {
  }

  filterPitches(searchTerm: string): Pitch[] {
    return [];
    // return this.pitchService.pitches.filter(p => p.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

  getMatchDay(id: string): Match_day {
    return this.matchDaysInSeason.find(t => t.id === id) || new Match_day();
  }

  displayPitch(pitch?: Pitch): string | undefined {
    return pitch ? pitch.label : undefined;
  }

  addKickoffDateToPitch(offset: number, event: any) {
    if (this.newMatchPitch.value) {
      const newElement: IPossibleKickoffs = {
        index: this.possibleKickoffs.length,
        pitch: this.newMatchPitch.value,
        kickoffTime: event.value,
        daysOffset: +offset,
        teamsCanPlay: this.teamsInSeason.map(x => <ITeamCanPlayAtDate>{ team: x, canPlay: true })
      };
      console.log(newElement);
      this.possibleKickoffs.push(newElement);
    }
  }

  removePair(index: number) {
    this.possibleKickoffs = this.possibleKickoffs.filter(x => x.index !== +index);
  }

  scheduleMatches() {

    this.matchDaysInSeason.filter( x => x.number >= this.startmatchDay).forEach(
      (matchDay) => {
        let possibleKickoffs: IPossibleKickoffs[] = JSON.parse(JSON.stringify(this.possibleKickoffs));
        const matches = this.matchesInSeason.filter(x => x.match_day_id === matchDay.id);
        matches.forEach(
          (match) => {
            if (possibleKickoffs) {
              possibleKickoffs = this.shuffle(possibleKickoffs);
              let list = possibleKickoffs.filter(x => x.teamsCanPlay.find(y => y.team.id === match.home_team_id).canPlay);
              list = list.filter(x => x.teamsCanPlay.find(y => y.team.id === match.guest_team_id).canPlay);
              if (list[0]) {
                if (!match.pitch && !match.kickoff) {
                  match.pitch = list[0].pitch;
                  match.kickoff = momentjs(matchDay.start_date).add(list[0].daysOffset, 'd').toDate();
                  match.kickoff.setUTCHours(new Date(list[0].kickoffTime).getUTCHours());
                  match.kickoff.setUTCMinutes(new Date(list[0].kickoffTime).getUTCMinutes());
                }
                possibleKickoffs = possibleKickoffs.filter(x => x.index !== list[0].index);
              } else {
                alert(`${matchDay.id}. Spieltag - Spiel ${match.home_team.name} - ${match.guest_team.name} konnte nicht terminiert werden`);
                console.error('iwas passt nicht');
              }
            }
          }
        );
      }
    );
  }

  saveMatches() {
    console.log(this.matchesInSeason);
    this.matchesInSeason.forEach(
      (match) => {
        console.log(match);
        const body = new ScheduleMatchBody({kickoff: match.kickoff});
        this.client.scheduleMatch(match.id, body).toPromise();
        const body2 = new LocateMatchBody({pitch_id: match.pitch.id});
        this.client.locateMatch(match.id, body2).toPromise();
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
