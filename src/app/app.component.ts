import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasonService } from './services/season.service';
import { Season, SeasonState } from '../api';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seasons: Season[];
  @ViewChild('seasonSelect') seasonSelect: MatSelect;

  constructor(public seasonService: SeasonService) {
  }

  async ngOnInit() {
    this.seasons = await this.seasonService.loadSeasons(SeasonState.Progress);
    this.seasonService.currentSeasonId.subscribe(
      (seasonId) => {
        this.seasonSelect.value = seasonId;
      }
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeasonId.next(event.value);
  }
}
