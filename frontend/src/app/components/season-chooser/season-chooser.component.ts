import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { filter, iif, map, Observable } from 'rxjs';
import { AllSeasonsFragment, SeasonState } from 'src/api/graphql';
import { SeasonService } from 'src/app/services/season.service';

export type SeasonChooserModes = 'progressSeason' | 'manageSeason' | 'historySeason';

@Component({
  selector: 'lima-season-chooser',
  templateUrl: './season-chooser.component.html',
})
export class SeasonChooserComponent {

  @Input() mode: SeasonChooserModes = 'progressSeason';

  SeasonState = SeasonState;
  season$!: Observable<AllSeasonsFragment>

  seasonList$ = this.seasonService.seasonList$.pipe(
    map(
      (seasonList) => {
        switch (this.mode) {
          case 'historySeason':
            return seasonList?.filter((s) => s?.state === SeasonState.Ended)
          case 'progressSeason':
            return seasonList?.filter((s) => s?.state === SeasonState.Progress)
          default:
            return seasonList
        }
      }
    )
  );

  constructor(
    public seasonService: SeasonService,
  ) {

  }

  ngOnInit() {
    this.season$ = this.seasonService[`${this.mode}$`];
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService[`${this.mode}$`].next(event.value);
  }

}
