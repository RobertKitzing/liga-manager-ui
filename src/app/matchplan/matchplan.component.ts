import { SeasonService } from '@app/service/season.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '@env/environment';
import { Client, Season, Match, Team, Body3, SeasonState } from '@app/api/openapi';
import { Logger } from '@app/core';
import { Subscription } from 'rxjs/Subscription';

const log = new Logger('Matchplan');

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.scss']
})
export class MatchplanComponent implements OnInit, OnDestroy  {

  version: string = environment.version;
  seasons: Season[];
  seasonsSub: Subscription;
  season: Season;

  matches: Match[];
  matchDay = 1;
  isLoadingMatches: boolean;
  matchDayCounter: number[] = new Array<number>();

  editMatch: string;

  constructor(private apiClient: Client,
              public seasonService: SeasonService) { }

  async ngOnInit() {
    this.seasonsSub = this.seasonService.season.subscribe(
      (season) => {
        log.debug(season);
        this.season = season;
        this.matchDayCounter = new Array();
        for (let i = 1; i <= season.match_day_count; i++) {
          this.matchDayCounter.push(i);
        }
        this.loadMatches();
      }
    );
    this.season = this.seasonService.getSelectedSeason();
    if (this.season) {
      this.matchDayCounter = new Array();
      for (let i = 1; i <= this.season.match_day_count; i++) {
        this.matchDayCounter.push(i);
      }
    }
    this.seasons = await this.seasonService.getSeasons(SeasonState.Progress);
    if (this.season) {
      this.loadMatches();
    }
  }

  ngOnDestroy() {
    this.seasonsSub.unsubscribe();
  }

  saveScore(match: string, team: string, score: string) {
    const t: Match = this.matches.find(m => m.id === match);
    t[team] = Number.parseInt(score);
  }

  saveResult(match: string, home: string, guest: string) {
    log.debug(home);
    const t: Match = this.matches.find(m => m.id === match);
    const result: Body3 = new Body3;
    result.home_score = Number.parseInt(home);
    result.guest_score = Number.parseInt(guest);
    this.apiClient.submitMatchResult(match, result).subscribe(
      (res: any) => {
        log.debug(res);
        t.home_score = result.home_score ;
        t.guest_score = result.guest_score;
      },
      (error) => {

      },
      () => {
        delete this.editMatch;
      }
    );
  }

  selectedMatchDayChanged() {
    this.loadMatches();
  }

  selectedSeasonChanged(s: Season) {
    this.seasonService.selectSeason(s);
  }

  loadMatches() {
    this.matches = null;
    this.isLoadingMatches = true;
    log.debug(this.matchDay);
    this.apiClient.getMatchCollection(this.season.id, this.matchDay, null, null, null).subscribe(
      (matches: Match[]) => {
        this.matches = matches;
        log.debug(matches);
      },
      (error) => {
        log.error(error);
      },
      () => {
        this.isLoadingMatches = false;
      }
    );
  }

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
