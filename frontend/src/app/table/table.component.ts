import { Component } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Ranking, RankingPosition } from 'src/api/graphql';
import { RankingService } from '../services/ranking.service';
import { SeasonService } from '../services/season.service';


@Component({
  selector: 'lima-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  displayedColumns: string[] = ['position', 'team', 'games', 'wins-draws-losses', 'goals', 'points'];

  ranking!: any;

  constructor(
    public rankingService: RankingService,
    public seasonService: SeasonService,
  ) {

  }

  ranking$ = this.seasonService.seasonsInProgress$.pipe(
    switchMap(
      (seasons) => this.rankingService.getRanking$({id: seasons![0]?.id!})
    ),
    tap(
      (ranking) => this.ranking = ranking!,
    )
  );
  
}
