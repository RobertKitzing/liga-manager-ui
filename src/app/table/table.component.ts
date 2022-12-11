import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RankingGQL } from 'src/api/graphql';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'lima-table',
  templateUrl: './table.component.html',
  styles: [
  ]
})
export class TableComponent {

  ranking$ = this.rankingGQL.watch({id: ''}).valueChanges

  constructor(
    private rankingGQL: RankingGQL,
  ) {

  }

}
