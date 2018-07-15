import { Component, OnInit } from '@angular/core';
import { Ranking, Client } from 'src/api';
import { SeasonService } from '../../services/season.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public ranking: Ranking;
  
  constructor(private seasonService: SeasonService, private api: Client) {
    this.seasonService.currentSeasonId.subscribe(
      (seasonId) => {
        this.api.getRanking(seasonId).subscribe(
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
