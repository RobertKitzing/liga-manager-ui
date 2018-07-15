import { Component, OnInit } from '@angular/core';
import { Ranking_position } from 'src/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  public table: Ranking_position[];

  constructor() {
    this.table = new Array<Ranking_position>();
    for (let i = 0; i < 18; i++) {
      const rp = new Ranking_position();
      rp.conceded_goals = 3;
      rp.draws = 1;
      rp.losses = 3;
      rp.matches = 20;
      rp.number = i;
      rp.points = 30;
      rp.scored_goals = 10;
      rp.sort_index = 1;
      rp.wins = 12;
      rp.team_id = 'Vibrator Moskovskaya' + i;
      this.table.push(rp);
    }
  }

  ngOnInit() {
  }

}
