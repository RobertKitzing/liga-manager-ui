import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { Team, PenaltyFragment } from 'src/api/graphql';
import { switchMap } from 'rxjs/operators';
import { I18Service } from '../../services/i18.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  ranking = this.seasonService.currentSeason.pipe(
    switchMap(
      (currentSeason) => this.seasonService.getRanking({id: currentSeason.id}),
    ),
  );

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
  }

  getPenaltyForTeam(penalties: PenaltyFragment[], team: Team): PenaltyFragment[] {
    const p = penalties.filter(t => t.team.id === team.id);
    return p.length === 0 ? null : p;
  }

  openPenaltyDialog(penalties: PenaltyFragment[]) {
    console.log(penalties);
  }
}
