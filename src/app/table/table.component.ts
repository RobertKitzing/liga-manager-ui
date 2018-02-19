import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';

const log = new Logger('Table');

@Component({
  selector: 'app-table',
  templateUrl: './table.ngx.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  version: string = environment.version;
  displayedColumns = [
                      { prop: 'number' },
                      { prop: 'team_id' },
                      { prop: 'matches' },
                      { prop: 'wins' },
                      { prop: 'draws' },
                      { prop: 'losses' },
                      { prop: 'scored_goals' },
                      { prop: 'conceded_goals' },
                      { prop: 'goals_diff' },
                      { prop: 'points' }
                     ];
  ranking: Position[];
  seasons: Season[] = new Array<Season>();
  seasonsSub: Subscription = new Subscription();
  season: Season;

  isLoadingSeasons: boolean;
  isLoadingRanking: boolean;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiClient: Client,
              public seasonService: SeasonService) {
              }

  async ngOnInit() {
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

  ngOnDestroy() {
    this.seasonsSub.unsubscribe();
  }

  selectedSeasonChanged(event: any) {
    this.seasonService.selectSeason(event.value);
  }

  loadRanking() {
    this.isLoadingRanking = true;
    this.apiClient.ranking(this.season.id).subscribe(
      (ranking: any) => {
        log.debug(ranking);
        this.ranking = ranking.positions;
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
