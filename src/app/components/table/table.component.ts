import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { Ranking, RankingGQL, Team, Penalty } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18Service } from '../../services/i18.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rankingQGL: Observable<Ranking.Ranking>;

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    private matchService: MatchService,
    private ranking: RankingGQL
  ) {
  }

  ngOnInit() {
    if (this.seasonService.currentSeason.getValue()) {
      this.getRanking();
    }
    this.matchService.seasonMatchUpdated.subscribe(
      (event) => {
        this.ranking.watch({ id: event.seasonId }, { fetchPolicy: 'network-only' }).refetch();
      }
    );
  }

  getRanking() {
    this.rankingQGL = this.ranking.watch({ id: this.seasonService.currentSeason.getValue().id }).valueChanges.pipe(
      map((result) => result.data.season.ranking)
    );
  }

  getPenaltyForTeam(penalties: Penalty.Fragment[], team: Team.Fragment): Penalty.Fragment[] {
    const p = penalties.filter(t => t.team.id === team.id);
    return p.length === 0 ? null : p;
  }
}
