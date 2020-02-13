import { Component, OnInit } from '@angular/core';
import { I18Service } from '../../services/i18.service';
import { AllTournamentListGQL, AllTournamentList, TournamentGQL, Tournament, Team, MatchDay } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { MatchService } from 'src/app/services/match.service';

export const SELECTED_TOURNAMENT_KEY = 'SELECTED_TOURNAMENT';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.less']
})
export class TournamentComponent implements OnInit {

  tournaments: Observable<AllTournamentList.AllTournaments[]>;
  tournament: Observable<Tournament.Fragment>;

  @LocalStorage(SELECTED_TOURNAMENT_KEY) selectedTournament: Tournament.Fragment;

  constructor(
    public i18Service: I18Service,
    private allTournamentQGL: AllTournamentListGQL,
    private tournamentQGL: TournamentGQL,
    private matchService: MatchService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.tournaments = this.allTournamentQGL.watch().valueChanges.pipe(
      map(({ data }) => data.allTournaments)
    );
    if (typeof this.selectedTournament === 'string') {
      this.localStorageService.clear(SELECTED_TOURNAMENT_KEY);
    }
    if (this.selectedTournament) {
      this.tournamentChanged();
    }
    this.matchService.tournamentMatchUpdated.subscribe(
      (event) => {
        if (event.tournamentId === this.selectedTournament) {
          this.matchUpdated(event.matchId);
        }
      }
    );
  }

  matchUpdated(matchId: string) {
  }

  tournamentChanged() {

    this.tournament = this.tournamentQGL.watch(
      {
        id: this.selectedTournament.id
      }
    ).valueChanges.pipe(
      map(({ data }) => {
        if (data.tournament && data.tournament.rounds) {
          data.tournament.rounds = data.tournament.rounds.sort((a, b) => a.number < b.number ? 1 : -1);
        }
        return data.tournament;
      })
    );
  }

  tournamentCompare(t1: AllTournamentList.AllTournaments, t2: AllTournamentList.AllTournaments ) {
    return t1 && t2 && t1.id === t2.id;
  }

  winnerOfRound(round: MatchDay.Fragment): Team.Fragment[] | null {
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
