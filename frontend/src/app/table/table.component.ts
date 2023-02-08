import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, iif, map, of, Subject, Subscription, switchMap } from 'rxjs';
import { RankingPosition } from 'src/api/graphql';
import { SeasonChooserModes } from '../components/season-chooser/season-chooser.component';
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
export class TableComponent implements OnInit, OnDestroy {

  seasonMode: SeasonChooserModes = 'progressSeason';

  displayedColumns: string[] = ['position', 'team', 'games', 'wins-draws-losses', 'goals', 'points'];

  expandedElement!: RankingPosition;

  rankingTrigger$ = new BehaviorSubject<null>(null);

  ranking$ = this.rankingTrigger$.pipe(
    switchMap(
      () => iif(
          () => this.seasonMode === 'progressSeason',
          this.seasonService.progressSeason$,
          this.seasonService.historySeason$
        )
    ),
    switchMap(
      (season) => {
        return season?.id ?this.rankingService.getRanking$({ id: season.id! }) : of(null)
      }
    ),
    map(
      (ranking) => ranking?.positions
    )
  );

  constructor(
    private rankingService: RankingService,
    private seasonService: SeasonService,
    private router: Router,
  ) {
  }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    if (this.router.url.includes('history')) {
      this.seasonMode = 'historySeason';
    }
  }
}
