import { Component, OnInit } from '@angular/core';
import { SeasonService } from './services/season.service';
import { Season, SeasonState } from '../api';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seasons: Season[];

  constructor(public seasonService: SeasonService) {
  }

  async ngOnInit() {
    this.seasons = await this.seasonService.loadSeasons();
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeasonId.next(event.value);
  }
}
