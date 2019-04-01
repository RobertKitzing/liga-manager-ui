import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { Ranking, RankingGQL } from 'src/api/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18Service } from '../../services/i18.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  rankingQGL: Observable<Ranking.Ranking>;
  error: boolean;

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    private ranking: RankingGQL,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    if (this.seasonService.currentSeason.getValue()) {
      this.getRanking();
    }
  }

  getRanking() {
    this.error = false;
    this.rankingQGL = this.ranking.watch({ id: this.seasonService.currentSeason.getValue().id }).valueChanges.pipe(
      map((result) => result.data.season.ranking)
    );
  }
}
