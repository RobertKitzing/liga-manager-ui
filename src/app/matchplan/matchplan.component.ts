import { SeasonService } from '@app/service/season.service';
import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Client, Season, Match, Team, Body3, SeasonState } from '@app/api/openopi';
import { Logger } from '@app/core';

const log = new Logger('Matchplan');

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.scss']
})
export class MatchplanComponent implements OnInit {

  version: string = environment.version;
  seasons: Season[];
  matches: Match[];
  teams: Team[];
  matchDay = 1;
  season: string;

  constructor(private apiClient: Client,
              private seasonService: SeasonService) { }

  ngOnInit() {
    this.seasons = this.seasonService.getSeasons(SeasonState.Progress);
  }

  loadTeams(season: string) {
    this.apiClient.teamAll(season).subscribe(
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

  selectedSeasonChanged(event: any) {
    this.season = event.value;
    this.loadMatches();
    this.loadTeams(event.value);
  }

  loadMatches() {
    this.matches = null;
    log.debug(this.season);
    this.apiClient.matchesAll(this.season, this.matchDay, null, null, null).subscribe(
      (matches: Match[]) => {
        log.debug(matches);
        this.matches = matches;
      }
    );
  }
}
