import { Component, OnInit } from '@angular/core';
import { Season, SeasonState } from '../../../../api';
import { SeasonService } from '../../../services/season.service';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-seasonchooser',
  templateUrl: './seasonchooser.component.html',
  styleUrls: ['./seasonchooser.component.css']
})
export class SeasonchooserComponent implements OnInit {

  seasons: Season[];
  season: Season;

  constructor(public seasonService: SeasonService) { }

  async ngOnInit() {
    this.seasons = await this.seasonService.loadSeasons(SeasonState.Progress);
    this.seasonService.currentSeason.subscribe(
      (season) => {
        this.season = season;
      }
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
  }

}
