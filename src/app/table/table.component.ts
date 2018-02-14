import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState } from './../api/openopi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';

const log = new Logger('Table');

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  version: string = environment.version;
  displayedColumns = ['number',
                      'team_id',
                      'matches',
                      'wins', 'draws', 'losses', 'scored_goals', 'conceded_goals', 'goals_diff', 'points'];
  rankingDataSource: MatTableDataSource<Position[]>;
  seasons: Season[] = new Array<Season>();
  seasonsSub: Subscription = new Subscription();
  teams: Team[];
  season: Season;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiClient: Client,
              private seasonService: SeasonService) {
              }

  ngOnInit() {
    this.season = this.seasonService.getSelectedSeason();
    this.seasonsSub = this.seasonService.season.subscribe(
      (season) => {
        log.debug(season);
        this.season = season;
        this.loadTeams();
        this.loadRanking();
      }
    );
    this.seasons = this.seasonService.getSeasons(SeasonState.Progress);
    log.debug(this.season);
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

  loadTeams() {
    this.apiClient.teamAll(this.season.id).subscribe(
      (teams: Team[]) => {
        log.debug(teams);
        this.teams = teams;
      }
    );
  }

  getTeamNameByID(id: string): string {
    const team: Team = this.teams.find(t => t.id === id);
    return team.name;
  }

  loadRanking() {

    this.apiClient.ranking(this.season.id).subscribe(
      (ranking: any) => {
        log.debug(ranking);
        this.rankingDataSource = new MatTableDataSource(ranking.positions);
        this.rankingDataSource.sort = this.sort;
      },
      (error: any) => {
        log.debug(error);
      }
    );
  }
}
