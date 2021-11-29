import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material/select';
import { SeasonState, AllSeasonsFragment } from 'src/api/graphql';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-seasonchooser',
  templateUrl: './seasonchooser.component.html',
  styleUrls: ['./seasonchooser.component.css']
})
export class SeasonchooserComponent implements OnInit {

  @Input() filterStates: Array<SeasonState> = [SeasonState.Progress, SeasonState.Ended];
  @Input() mode: 'currentSeason' | 'manageSeason' = 'currentSeason';

  SeasonState = SeasonState;

  season: Observable<AllSeasonsFragment>

  filteredSeasonList = this.seasonService.seasonList.pipe(
    map(
      (seasonList) => seasonList.filter(s => this.filterStates.some(x => x === s.state))
    ),
  );

  constructor(
    public seasonService: SeasonService,
  ) {
  }

  ngOnInit() {
    this.season = this.seasonService[this.mode];
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService[this.mode].next(event.value);
  }

}
