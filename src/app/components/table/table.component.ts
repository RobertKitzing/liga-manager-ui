import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { Season, RankingGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18Service } from '../../services/i18.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rankingQGL: Observable<Season.Ranking>;

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    private ranking: RankingGQL) {
  }

  ngOnInit() {
    if (this.seasonService.currentSeason.getValue()) {
      this.getRanking();
    }
  }

  getRanking() {
    this.rankingQGL = this.ranking.watch({id: this.seasonService.currentSeason.getValue().id}).valueChanges.pipe(
      map(({data}) => data.season.ranking)
    );
  }
}
