import { Component, OnInit } from '@angular/core';
import { Ranking, Client } from 'src/api';
import { SeasonService } from '../../services/season.service';
import { TeamService } from '../../services/team.service';

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
    public teamService: TeamService) {

    this.seasonService.currentSeasonId.subscribe(
      (season) => {
        this.api.getRanking(season.id).subscribe(
          (ranking) => {
            this.ranking = ranking;
          },
          (error) => {
            console.error(error);
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
