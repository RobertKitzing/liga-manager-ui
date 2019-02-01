import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../services/season.service';
import { I18Service } from '../../services/i18.service';
import { Observable } from 'rxjs';
import { Season } from '../../../api/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.css']
})
export class MatchplanComponent implements OnInit {

  public seasonQGL: Observable<Season.Season>;
  public hidePlayed: boolean;

  public set selectedMatchDay(value: Season.MatchDays) {
    localStorage.setItem('SELECTED_MATCHDAY', JSON.stringify(value));
  }

  public get selectedMatchDay(): Season.MatchDays {
    return JSON.parse(localStorage.getItem('SELECTED_MATCHDAY')) || {};
  }

  public get selectedTeamId() {
    return localStorage.getItem('SELECTED_TEAM') || '0';
  }

  public set selectedTeamId(value: string) {
    localStorage.setItem('SELECTED_TEAM', value);
  }

  public get filterActive(): boolean {
    return this.hidePlayed;
  }

  constructor(
    public seasonService: SeasonService,
    public i18Service: I18Service
  ) { }

  ngOnInit() {
    this.seasonService.currentSeasonQGL.valueChanges.subscribe(
      (season) => {
        console.log(season);
      }
    );
    this.seasonQGL = this.seasonService.currentSeasonQGL.valueChanges.pipe(
      map(
        ({data}) => data.season)
    );
  }

  filterMatchDays(matchDays: Season.MatchDays[]) {
    if (this.selectedMatchDay.number !== 0) {
      return matchDays.filter(x => x.number === this.selectedMatchDay.number);
    } else {
      return matchDays;
    }
  }

  handleGetMatches() {
    
  }

  matchDayCompare(md1: Season.MatchDays, md2: Season.MatchDays) {
    return md1 && md2 && md1.id === md2.id;
  }

  // isNewMatchDay(match: AllSeasons.Matches, index: number): boolean {
  //   if (!match || index < 1) {
  //     return true;
  //   } else {
  //     const currentMatchDay = this.getMatchDay(match.id);
  //     const previusMatchDay = this.getMatchDay(this.matches[index - 1].id);
  //     return currentMatchDay.number !== previusMatchDay.number;
  //   }
  // }
}
