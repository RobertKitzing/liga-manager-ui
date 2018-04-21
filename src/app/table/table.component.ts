import { TeamService } from './../service/team.service';
import { DetailRowComponent } from './table.detail.row.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, SeasonState, Ranking_position } from './../api/openapi';
import { Component,
         OnInit,
         ViewChild,
         AfterViewInit,
         OnDestroy,
         ViewContainerRef,
         ComponentFactory,
         ComponentFactoryResolver,
         ViewChildren,
         QueryList,
         ComponentRef
       } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/service/logger.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

const log = new Logger('Table');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

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
  isLoadingRanking: boolean;
  errorLoadingRanking: boolean;

  @ViewChild(MatSort) sort: MatSort;
  expandedRow: number;
  @ViewChildren('tableRow', { read: ViewContainerRef }) containers: QueryList<ViewContainerRef>;

  constructor(private apiClient: Client,
              public seasonService: SeasonService,
              public media: ObservableMedia,
              private resolver: ComponentFactoryResolver,
              public teamService: TeamService) {

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

  expandRow(index: number, row: Ranking_position) {
    if (this.media.isActive('lg') || this.media.isActive('md')) {
      return;
    }
    if (!this.expandedRow) {
      this.containers.forEach((item) => {
        item.clear();
      });
    }
    if (this.expandedRow === index) {
      this.expandedRow = null;
      log.debug('null');
    } else {
      const container = this.containers.toArray()[index];
      const factory: ComponentFactory<DetailRowComponent> = this.resolver.resolveComponentFactory(DetailRowComponent);
      const detailRow: ComponentRef<DetailRowComponent> = container.createComponent(factory);
      detailRow.instance.ranking = row;
    }
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
    this.errorLoadingRanking = false;
    this.apiClient.getRanking(this.season.id).subscribe(
      (ranking: Ranking) => {
        log.debug(ranking);
        this.rankingDataSource = new MatTableDataSource(ranking.positions);
        this.rankingDataSource.sort = this.sort;
      },
      (error: any) => {
        log.debug(error);
        this.errorLoadingRanking = true;
      },
      () => {
        this.isLoadingRanking = false;
      }
    );
  }
}
