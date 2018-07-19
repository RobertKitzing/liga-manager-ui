import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasonService } from './services/season.service';
import { Season, SeasonState } from '../api';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seasons: Season[];
  @ViewChild('seasonSelect') seasonSelect: MatSelect;

  constructor(
    public seasonService: SeasonService,
    private teamService: TeamService) {
  }

  async ngOnInit() {
    this.seasons = await this.seasonService.loadSeasons();
    await this.teamService.loadTeams();
    this.seasonService.currentSeason.subscribe(
      (seasonId) => {
        this.seasonSelect.value = seasonId;
      }
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
  }
}
