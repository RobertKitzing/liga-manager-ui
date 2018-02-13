import { Client, Season, Ranking, Team, SeasonState } from './../api/openopi';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  version: string = environment.version;
  displayedColumns = ['number',
                      'team_id',
                      'matches',
                      'wins', 'draws', 'losses', 'scored_goals', 'conceded_goals', 'goals_diff', 'points'];
  rankingDataSource: MatTableDataSource<Position[]>;
  seasons: Season[];
  teams: Team[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private apiClient: Client) { }

  ngOnInit() {
    this.apiClient.seasonAll().subscribe(
        (seasons: Season[]) => {
            console.log(seasons);
            this.seasons = seasons.filter(s => s.state === SeasonState.Progress);
            console.log(seasons);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {

  }

  selectedSeasonChanged(event: any) {
    this.loadRanking(event.value);
    this.loadTeams(event.value);
  }

  sortData(sort: Sort) {
    console.log(sort);
    this.rankingDataSource.sort = this.sort;
  }

  loadTeams(season: string) {
    this.teams = null;
    this.apiClient.teamAll(season).subscribe(
      (teams: Team[]) => {
        console.log(teams);
        this.teams = teams;
      }
    );
  }

  getTeamNameByID(id: string): string {
    const team: Team = this.teams.find(t => t.id === id);
    return team.name;
  }

  loadRanking(season: string) {
    this.rankingDataSource = null;
    this.apiClient.ranking(season).subscribe(
      (ranking: any) => {
        console.log(ranking);
        this.rankingDataSource = new MatTableDataSource(ranking.positions);
        this.rankingDataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
// export interface Ranking {
//   season_id: string;
//   team_id: string;
//   sort_index: number;
//   number: number;
//   matches: number;
//   wins: number;
//   draws: number;
//   losses: number;
//   scored_goals: number;
//   conceded_goals: number;
//   points: number;
// }

// const RANKING_DATA: Ranking[] = [
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': '07d24dfa-1c67-4780-99c4-92a5bed3c038',
//     'sort_index': 0,
//     'number': 1,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 0,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': '51856913-540b-43f2-a80a-5d05fd1b08c4',
//     'sort_index': 0,
//     'number': 2,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 50,
//     'conceded_goals': 10,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': '8e973313-d269-4f49-9244-20fb73a09e60',
//     'sort_index': 0,
//     'number': 3,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 10,
//     'conceded_goals': 0,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': '9011242b-017c-40b6-b5d1-0b48de5f9eb5',
//     'sort_index': 0,
//     'number': 4,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 10,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': 'a58d9202-8bc4-4471-887c-79f66e9599d3',
//     'sort_index': 0,
//     'number': 5,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 0,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': 'c6583519-ff6f-40d0-b103-ebbb61557399',
//     'sort_index': 0,
//     'number': 6,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 0,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': 'f7e9d84c-a42e-4999-98cb-3c4ee584bdb1',
//     'sort_index': 0,
//     'number': 10,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 0,
//     'points': 0
//   },
//   {
//     'season_id': '138873d5-dfb0-4dbc-8c5d-2545da2d1e16',
//     'team_id': 'fbe2ee48-9bb2-47e8-8fb4-1454b503cab4',
//     'sort_index': 0,
//     'number': 0,
//     'matches': 0,
//     'wins': 0,
//     'draws': 0,
//     'losses': 0,
//     'scored_goals': 0,
//     'conceded_goals': 0,
//     'points': 0
//   }
// ];
