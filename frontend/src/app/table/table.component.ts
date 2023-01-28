import { Component } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
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

  ranking$ = this.seasonService.currentSeason$.pipe(
    switchMap(
      (seasons) => this.rankingService.getRanking$({id: seasons.id!})
    ),
    map(
      (ranking) => ranking?.positions
    )
  );

  constructor(
    public rankingService: RankingService,
    public seasonService: SeasonService,
  ) {

  }
  
}
