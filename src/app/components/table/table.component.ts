import { Component, OnInit } from '@angular/core';
import { Ranking, Client } from '../../../api';
import { SeasonService } from '../../services/season.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public ranking: Ranking;
  public currentSeasonName: string;

  constructor(
    private seasonService: SeasonService,
    private api: Client,
    public teamService: TeamService) {

    this.seasonService.currentSeason.subscribe(
      (season) => {
        this.currentSeasonName = season.name;
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
    );
  }

  ngOnInit() {
  }

}
