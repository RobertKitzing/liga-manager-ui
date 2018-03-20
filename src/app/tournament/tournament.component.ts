import { SeasonService } from '@app/service/season.service';
import { Match } from '@app/api/openapi';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  rounds: Match[][];
  matches: Match[] = MatchesMock;
  constructor(public seasonService: SeasonService) { }

  ngOnInit() {
  }

}

const MatchesMock: Match[] = <Match[]>
[
  {
    'guest_score': 3,
    'guest_team_id': '473a671a-7a2d-49d9-9e1f-257b51f5b943',
    'home_score': 2,
    'home_team_id': 'f8cfefad-057d-4226-87e1-0cf5666f2852',
    'id': '472278c3-4cad-4ea7-9da8-4f791da5c56c',
    'match_day': 1,
    'pitch_id': null,
    'season_id': '342aa3cc-bf84-424a-8254-138d89803950'
  },
  {
    'guest_score': null,
    'guest_team_id': '26967aec-4387-4997-a56a-8f73f1fd375d',
    'home_score': null,
    'home_team_id': '5406894e-2f43-4b8d-ac46-1ad76345805f',
    'id': '68d0f8f7-7796-4cf7-b7df-0db7f3acadae',
    'match_day': 1,
    'pitch_id': null,
    'season_id': '342aa3cc-bf84-424a-8254-138d89803950'
  },
  {
    'guest_score': null,
    'guest_team_id': '7c9219af-97d5-478e-863d-c5e3154c87cd',
    'home_score': null,
    'home_team_id': 'e111cbc7-f174-4f67-91be-cb4f1d6d4d9a',
    'id': '870fef47-622b-4f3b-85dd-97b5dc8e5c6f',
    'match_day': 1,
    'pitch_id': null,
    'season_id': '342aa3cc-bf84-424a-8254-138d89803950'
  }
];
