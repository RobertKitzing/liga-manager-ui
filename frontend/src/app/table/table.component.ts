import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs';
import { Ranking, RankingPosition } from 'src/api/graphql';
import { RankingService } from '../services/ranking.service';
import { SeasonService } from '../services/season.service';


@Component({
  selector: 'lima-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'team', 'games', 'wins-draws-losses', 'goals', 'points'];

  ranking$ = this.seasonService.currentSeason$.pipe(
    switchMap(
      (seasons) => this.rankingService.getRanking$({ id: seasons.id! })
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

  ngOnInit(): void {
    this.seasonService.seasonsInProgress$.pipe(take(1)).subscribe();
  }
}
