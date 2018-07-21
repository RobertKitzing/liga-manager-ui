import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { MatchService } from '../../services/match.service';
import { MatchViewModel } from '../../models/match.viewmodel';
import { Season } from '../../../api';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public matches: MatchViewModel[];
  public matchDays: number[];
  public set selectedMatchDay(value: number) {
    localStorage.setItem('SELECTED_MATCHDAY', value.toString());
  }
  public get selectedMatchDay(): number {
    return Number(localStorage.getItem('SELECTED_MATCHDAY')) || 1;
  }
  private season: Season;

  constructor(
    private seasonService: SeasonService,
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.seasonService.currentSeason.subscribe(
      async (season) => {
        this.season = season;
        this.handleGetMatches();
      }
    );
  }

  async handleGetMatches() {
    this.matches = await this.matchService.getMatchesInSeason(this.season.id, this.selectedMatchDay);
    this.matchDays = Array.from(new Array(this.season.match_day_count), (val, index) => index + 1);
  }

}
