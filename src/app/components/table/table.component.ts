import { Component, OnInit } from '@angular/core';
import { Ranking, Client } from '../../../api';
import { SeasonService } from '../../services/season.service';
import { MatchService } from '../../services/match.service';
import { Season } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rankingQGL: Observable<Season.Ranking>;

  constructor(
    public seasonService: SeasonService) {
  }

  ngOnInit() {
    this.rankingQGL = this.seasonService.currentSeasonQGL.valueChanges.pipe(
      map(({data}) => data.season.ranking)
    );
  }
}
