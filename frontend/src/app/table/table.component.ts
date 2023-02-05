import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { map, of, switchMap } from 'rxjs';
import { RankingPosition } from 'src/api/graphql';
import { RankingService } from '../services/ranking.service';
import { SeasonService } from '../services/season.service';


@Component({
  selector: 'lima-table',
  templateUrl: './table.component.html',
  styles: [
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit {

  currentSeason$ = this.seasonService.currentSeason$;

  displayedColumns: string[] = ['position', 'team', 'games', 'wins-draws-losses', 'goals', 'points'];

  expandedElement!: RankingPosition;

  ranking$ = this.seasonService.currentSeason$.pipe(
    switchMap(
      (currentSeason) => currentSeason?.id ?this.rankingService.getRanking$({ id: currentSeason.id! }) : of(null)
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
  }
}
