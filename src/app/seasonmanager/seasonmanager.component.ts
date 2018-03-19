import { Match, Body6 } from '@app/api/openapi';
import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState, Body5, Identifier } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort, MatCheckboxChange, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { TranslateService } from '@ngx-translate/core';

const log = new Logger('Seasonmanager');

@Component({
  selector: 'app-seasonmanager',
  templateUrl: './seasonmanager.component.html',
  styleUrls: ['./seasonmanager.component.scss']
})
export class SeasonManagerComponent implements OnInit {

  isLinear: boolean = true;
  createSeasonFormGroup: FormGroup;
  selectTeamsFormGroup: FormGroup;

  allTeams: Team[];
  selectedTeams: Team[] = new Array<Team>();
  isLoadingAllTeams: boolean;

  newSeasonID: Identifier;
  newSeasonMatches: Match[];
  newTeamName: string;

  public newSeasonMatchDayCount: number;
  public matchDayCounter: number[];

  constructor(private apiClient: Client,
              private seasonService: SeasonService,
              private _formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private translateService: TranslateService) {
              }
  ngOnInit() {
    this.createSeasonFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.selectTeamsFormGroup = this._formBuilder.group({
    });
  }

  createSeasonStepperChanged(event: StepperSelectionEvent) {
    switch (event.selectedIndex) {
      case 1: {
        this.loadAllTeams();
        break;
      }
      case 2: {
        this.addTeamsToSeason();
        break;
      }

    }
  }

  loadAllTeams() {
    this.isLoadingAllTeams = true;
    this.apiClient.getTeamCollection().subscribe(
      (teams) => {
        this.allTeams = teams.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase() ? -1: 1));
      },
      (error) => {
        log.error(error);
      },
      () => {
        this.isLoadingAllTeams = false;
      }
    );
  }

  addAllTeams() {
    this.selectedTeams = this.allTeams;
  }

  removeAllTeams() {
    this.selectedTeams = new Array<Team>();
  }

  isSelectedTeam(id: string) {
    return this.selectedTeams.findIndex(t => t.id === id) !== -1;
  }

  createSeason(name: string) {
    const opt: Body5 = new Body5();
    opt.name = name;
    this.apiClient.createSeason(opt).subscribe(
      (id: Identifier) => {
        this.newSeasonID = id;
        log.debug('sucess');
      },
      (error) => {
        log.error(error);
      },
      () => {
        log.debug('finally');
      }
    );
  }

  handleTeam(event: MatCheckboxChange) {
    const team: any = event.source.value;
    log.debug(team);
    log.debug(this.selectedTeams);
    if (event.checked) {
      this.selectedTeams.push(<Team> team);
    } else {
      this.selectedTeams = this.selectedTeams.filter(t => t.id !== team.id);
    }
    this.selectedTeams = this.selectedTeams.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase() ? -1: 1));
    log.debug(this.selectedTeams);
  }

  addTeamsToSeason() {
    this.selectedTeams.forEach((value, index) => {
      this.apiClient.addTeamToSeason(this.newSeasonID.id, value.id).toPromise().catch();
    });
  }

  getSelectedTeamsAsStringList(): string {
    return this.selectedTeams.map(t => t.name).join();
  }

  getTeamNameByID(id: string): string {
    const team: Team = this.selectedTeams.find(t => t.id === id);
    return team.name;
  }

  createMatches() {
    this.apiClient.createMatches(this.newSeasonID.id).subscribe(
      () => {
        this.apiClient.getSeason(this.newSeasonID.id).subscribe(
          (res) => {
            this.newSeasonMatchDayCount = res.match_day_count;
            this.newSeasonMatchDayCount = res.match_day_count;
            this.matchDayCounter = new Array();
            for (let i = 1; i <= res.match_day_count; i++) {
              this.matchDayCounter.push(i);
            }
          }
        );
      }
    );
  }

  getMatches(matchDay: any) {
    log.debug(matchDay);
    this.apiClient.getMatchCollection(this.newSeasonID.id, matchDay, null, null, null).subscribe(
      (matches: Match[]) => {
        log.debug(matches);
        this.newSeasonMatches = matches;
      },
      (error) => {
        log.error(error);
      },
      () => {
      }
    );
  }

  startSeason() {
    this.apiClient.startSeason(this.newSeasonID.id).subscribe(
      () => {
        alert('Season startet');
      }
    );
  }

  addNewTeam(teamName: string) {
    if (teamName) {
      const createTeamParams: Body6 = new Body6();
      createTeamParams.name = teamName;
      this.apiClient.createTeam(createTeamParams).subscribe(
        () => {
          this.snackBar.open(this.translateService.instant('NEW_TEAM_CREATED', {name: teamName}),'', {
            duration: 500,
          });
          this.loadAllTeams();
        }
      )
    }
  }
}
