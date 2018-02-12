import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Client, Season, Match, Team, Body3 } from '@app/api/openopi';

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
  matchDay: number = 1;
  season: string;

  constructor(private apiClient: Client) { }

  ngOnInit() {
    this.apiClient.seasonAll().subscribe(
      (seasons: Season[]) => {
        console.log(seasons);
        this.seasons = seasons;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadTeams(season: string) {
    this.apiClient.teamAll(season).subscribe(
      (teams: Team[]) => {
        console.log(teams);
        this.teams = teams;
      }
    )
  }
  
  saveScore(match:string, team: string, score: string) {
    const t: Match = this.matches.find(m => m.id == match);
    t[team] = Number.parseInt(score);
  }
  getTeamNameByID(id: string): string {
    const t: Team = this.teams.find(t => t.id == id)
    return t.name;
  }

  saveResult(match: string) {
    const t: Match = this.matches.find(m => m.id == match);
    const res: Body3 = new Body3;
    res.guest_score = t.guest_score;
    res.home_score = t.home_score;
    this.apiClient.result(match, res).subscribe(
      (res: any) => {
        console.log(res);
      }
    )
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
    console.log(this.season);
    this.apiClient.matchesAll(this.season, this.matchDay, null, null, null).subscribe(
      (matches: Match[]) => {
        console.log(matches);
        this.matches = matches;
      }
    )
  }
}
