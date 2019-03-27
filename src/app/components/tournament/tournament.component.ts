import { Component, OnInit } from '@angular/core';
import { I18Service } from '../../services/i18.service';
import { AllTournamentListGQL, AllTournamentList, TournamentGQL, Tournament } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorage } from 'ngx-store';

export const SELECTED_TOURNAMENT_KEY = 'SELECTED_TOURNAMENT';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.less']
})
export class TournamentComponent implements OnInit {

  tournaments: Observable<AllTournamentList.AllTournaments[]>;
  tournament: Observable<Tournament.Fragment>;

  @LocalStorage(SELECTED_TOURNAMENT_KEY) tournamentId: string;

  constructor(
    public i18Service: I18Service,
    private allTournamentQGL: AllTournamentListGQL,
    private tournamentQGL: TournamentGQL
  ) { }

  ngOnInit() {
    this.tournaments = this.allTournamentQGL.watch().valueChanges.pipe(
      map(({ data }) => data.allTournaments)
    );
    if (this.tournamentId) {
      this.tournamentChanged();
    }
  }

  matchUpdated(matchId: string) {
    this.tournamentQGL.watch(
      {
        id: this.tournamentId
      }
    ).refetch();
  }

  tournamentChanged() {

    this.tournament = this.tournamentQGL.watch(
      {
        id: this.tournamentId
      }
    ).valueChanges.pipe(
      map(({ data }) => {
        if (data.tournament.rounds) {
          data.tournament.rounds = data.tournament.rounds.sort((a, b) => a.number < b.number ? 1 : -1);
        }
        return data.tournament;
      })
    );

    // this.matches = null;
    // const matches = await this.matchService.getMatchesInTournament(this.tournament.id);
    // this.tournamentRounds = await this.matchService.getRoundsInTournament(this.tournament.id);
    // this.matches = new Array<MatchViewModel[]>();
    // for (let round = 0; round < this.tournamentRounds.length; round++) {
    //   this.matches[round] = matches.filter(m => this.getRound(m.match_day_id).number === (round + 1));
    // }
    // this.matches = this.matches.reverse();
    // this.getWinner();
  }

  getWinner() {
    // this.winnerLastRound = new Array<Team>();
    // if (this.matches[0]) {
    //   this.matches[0].forEach(
    //     (match) => {
    //       if (match.home_score != null && match.guest_score != null && match.home_score >= 0 && match.guest_score >= 0) {
    //         this.winnerLastRound.push(match.home_score > match.guest_score ? match.home_team : match.guest_team);
    //       }
    //     });
    //   this.winnerLastRound = this.winnerLastRound.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
    // }
  }

  // newWinner(match: MatchViewModel) {
  //   if (match.home_score != null && match.guest_score != null && match.home_score >= 0 && match.guest_score >= 0) {
  //     if (match.home_score > match.guest_score) {
  //       this.winnerLastRound = this.winnerLastRound.filter(t => t.id !== match.guest_team_id);
  //       this.winnerLastRound.push(match.home_team);
  //     } else {
  //       this.winnerLastRound = this.winnerLastRound.filter(t => t.id !== match.home_team_id);
  //       this.winnerLastRound.push(match.guest_team);
  //     }

  //     this.winnerLastRound = this.winnerLastRound.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
  //   }
  // }
}
