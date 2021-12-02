import { Component, OnInit } from '@angular/core';
import { I18Service } from '../../services/i18.service';
import { Tournament, Team, MatchDay } from 'src/api/graphql';
import { Observable, of } from 'rxjs';
import { TournamentService } from 'src/app/services/tournament.service';
import { FormControl } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

export const SELECTED_TOURNAMENT_KEY = 'SELECTED_TOURNAMENT';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.less']
})
export class TournamentComponent implements OnInit {

  tournamentFormControl = new FormControl();

  tournament = this.tournamentService.currentTournament.pipe(
    switchMap(
      (tournament) => tournament?.id ? this.tournamentService.getTournament({id: tournament.id}) : of(null),
    ),
    tap(
      (tournament) => {
        this.tournamentFormControl.setValue(tournament, { emitEvent: false});
      }
    ),
  );
  
  constructor(
    public i18Service: I18Service,
    public tournamentService: TournamentService,
  ) { }

  ngOnInit() {
    this.tournamentFormControl.valueChanges.subscribe(
      (t)=> {
        this.tournamentService.currentTournament.next(t);
      }
    );
  }

  tournamentCompare(t1: Tournament, t2: Tournament ) {
    return t1 && t2 && t1.id === t2.id;
  }

  winnerOfRound(round: MatchDay): Team[] | null {
    const t = round.matches.map(x => {
      if (x.home_score > x.guest_score) {
        return x.home_team;
      } else if (x.home_score < x.guest_score) {
        return x.guest_team;
      } else {
        return null;
      }
    });
    return t.filter(x => x != null);
  }
}
