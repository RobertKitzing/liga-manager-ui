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
  matches: Match[];
  teams: Team[];
  matchDay = 1;
  season: Season;

  constructor(private apiClient: Client,
              private seasonService: SeasonService) { }

  async ngOnInit() {
    this.seasonsSub = this.seasonService.season.subscribe(
      (season) => {
        log.debug(season);
        this.season = season;
        this.loadTeams();
        this.loadMatches();
      }
    );
    this.season = this.seasonService.getSelectedSeason();
    this.seasons = await this.seasonService.getSeasons(SeasonState.Progress);
    if (this.season) {
      this.loadTeams();
      this.loadMatches();
    }
  }

  ngOnDestroy() {
    this.seasonsSub.unsubscribe();
  }

  loadTeams() {
    this.apiClient.teamAll(this.season.id).subscribe(
      (teams: Team[]) => {
        log.debug(teams);
        this.teams = teams;
      }
    );
  }

  saveScore(match: string, team: string, score: string) {
    const t: Match = this.matches.find(m => m.id === match);
    t[team] = Number.parseInt(score);
  }

  getTeamNameByID(id: string): string {
    const team: Team = this.teams.find(t => t.id === id);
    return team.name;
  }

  saveResult(match: string, home: string, guest: string) {
    const t: Match = this.matches.find(m => m.id === match);
    const result: Body3 = new Body3;
    result.home_score = Number.parseInt(home);
    result.guest_score = Number.parseInt(guest);
    this.apiClient.result(match, result).subscribe(
      (res: any) => {
        log.debug(res);
        t.home_score = result.home_score ;
        t.guest_score = result.guest_score;
      }
    );
  }

  selectedMatchDayChanged(event: any) {
    this.matchDay = event.value;
    this.loadMatches();
  }

  selectedSeasonChanged(s: Season) {
    log.debug(s);
    this.seasonService.selectSeason(s);
  }

  loadMatches() {
    this.matches = null;
    log.debug(this.season);
    this.apiClient.matchesAll(this.season.id, this.matchDay, null, null, null).subscribe(
      (matches: Match[]) => {
        log.debug(matches);
        this.matches = matches;
      }
    );
  }

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
