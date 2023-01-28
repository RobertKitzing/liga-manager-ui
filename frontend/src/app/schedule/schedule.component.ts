import { Component, OnInit } from '@angular/core';
import { of, switchMap, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { I18nService } from '../services/i18n.service';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'lima-schedule',
  templateUrl: './schedule.component.html',
  styles: [
  ]
})
export class ScheduleComponent implements OnInit {

  season$ = this.seasonService.currentSeason$.pipe(
    switchMap(
      (currentSeason) => currentSeason?.id ? this.seasonService.getSeason({ id: currentSeason.id }) : of(null),
    ),
  );

  constructor(
    private seasonService: SeasonService,
    public i18nService: I18nService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.seasonService.seasonsInProgress$.pipe(take(1)).subscribe();
  }

  openCancelMatchDialog() {
    throw new Error('Method not implemented.');
  }
  openEditPitchDialog() {
    throw new Error('Method not implemented.');
  }
  openEditResultDialog() {
    throw new Error('Method not implemented.');
  }
}
