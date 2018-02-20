import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState, Ranking_position } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

const log = new Logger('Table');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TableComponent implements OnInit, OnDestroy {

  version: string = environment.version;

  allColumns = ['number',
                'team_id',
                'matches',
                'wins',
                'draws',
                'losses',
                'scored_goals',
                'conceded_goals',
                'goals_diff',
                'points'];

  xsColumns = [ 'number',
                'team_id',
                'matches',
                'points'];

  smColumns = [ 'number',
                'team_id',
                'matches',
                'scored_goals',
                'conceded_goals',
                'points'];

  displayedColumns: string[];

  expandedElement: any;

  rankingDataSource: MatTableDataSource<Ranking_position>;
  seasons: Season[] = new Array<Season>();
  seasonsSub: Subscription = new Subscription();
  season: Season;

  isLoadingSeasons: boolean;
  isLoadingRanking: boolean;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiClient: Client,
              public seasonService: SeasonService,
              public media: ObservableMedia) {
                this.expandedElement = null;
                media.asObservable()
                .subscribe((change: MediaChange) => {
                  switch (change.mqAlias) {
                    case 'xs': {
                      this.displayedColumns = this.xsColumns;
                      break;
                    }
                    case 'sm': {
                      this.displayedColumns = this.smColumns;
                      break;
                    }
                    default : {
                      this.displayedColumns = this.allColumns;
                    }
                  }
                });
              }

  isExpansionDetailRow = (i: any, row: any) => row.hasOwnProperty('detailRow');

  async ngOnInit() {
    if (this.media.isActive('xs')) {
      this.displayedColumns = this.xsColumns;
    } else if (this.media.isActive('sm')) {
      this.displayedColumns = this.smColumns;
    } else {
      this.displayedColumns = this.allColumns;
    }

    this.season = this.seasonService.getSelectedSeason();
    this.seasonsSub = this.seasonService.season.subscribe(
      (season) => {
        log.debug(season);
        this.season = season;
        this.loadRanking();
      },
      (error) => {
        log.error(error);
      }
    );
    this.seasons = await this.seasonService.getSeasons(SeasonState.Progress);
    if (this.season) {
      this.loadRanking();
    }
  }

  onDetailClick(row: any) {
    this.expandedElement = row;
    log.debug(row);
  }

  ngOnDestroy() {
    this.seasonsSub.unsubscribe();
  }

  selectedSeasonChanged(event: any) {
    this.seasonService.selectSeason(event.value);
  }

  sortData(sort: Sort) {
    log.debug(sort);
    this.rankingDataSource.sort = this.sort;
  }

  loadRanking() {
    this.isLoadingRanking = true;
    this.apiClient.ranking(this.season.id).subscribe(
      (ranking: Ranking) => {
        log.debug(ranking);
        this.rankingDataSource = new MatTableDataSource(ranking.positions);
        this.rankingDataSource.sort = this.sort;
      },
      (error: any) => {
        log.debug(error);
      },
      () => {
        this.isLoadingRanking = false;
      }
    );
  }

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
