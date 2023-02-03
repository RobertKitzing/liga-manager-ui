import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { AllSeasonsFragment, SeasonState } from 'src/api/graphql';
import { SeasonService } from 'src/app/services/season.service';

@Component({
  selector: 'lima-season-chooser',
  templateUrl: './season-chooser.component.html',
})
export class SeasonChooserComponent {

  @Input() filterStates: Array<SeasonState> = [SeasonState.Progress, SeasonState.Ended];
  @Input() mode: 'currentSeason' | 'manageSeason' = 'currentSeason';

  SeasonState = SeasonState;
  season$!: Observable<AllSeasonsFragment>

  seasonList$ = this.seasonService.seasonList$(this.filterStates);

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
