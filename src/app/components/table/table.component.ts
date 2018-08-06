import { Component, OnInit } from '@angular/core';
import { Ranking, Client, Season } from '../../../api';
import { SeasonService } from '../../services/season.service';
import { TeamService } from '../../services/team.service';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public ranking: Ranking;

  constructor(
    private seasonService: SeasonService,
    private api: Client,
    public teamService: TeamService,
    private matchService: MatchService) {
  }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      (season) => {
        this.loadRanking(season);
      }
    );
    this.matchService.matchUpdated.subscribe(
      (matchId) => {
        this.loadRanking(this.seasonService.currentSeason.getValue());
      });
  }

  loadRanking(season: Season) {
    this.ranking = null;
    if (season) {
      this.api.getRanking(season.id).subscribe(
        (ranking) => {
          this.ranking = ranking;
        },
        (error) => {
          delete this.ranking;
        },
        () => {

        }
      );
    }
  }
}
