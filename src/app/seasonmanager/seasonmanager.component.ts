import { Match } from '@app/api/openapi';
import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState, Body5, Identifier } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort, MatCheckboxChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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

  constructor(private apiClient: Client,
              private seasonService: SeasonService,
              private _formBuilder: FormBuilder) {
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
    this.apiClient.team3().subscribe(
      (teams) => {
        this.allTeams = teams;
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
    this.apiClient.season(opt).subscribe(
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
    this.selectedTeams = this.selectedTeams.sort((t1, t2) => {
      if (t1.name > t2.name) {
          return 1;
      }
      if (t1.name < t2.name) {
          return -1;
      }
      return 0;
    });
    log.debug(this.selectedTeams);
  }

  addTeamsToSeason() {
    this.selectedTeams.forEach((value, index) => {
      this.apiClient.team(this.newSeasonID.id, value.id).toPromise().catch();
    });
  }

  getSelectedTeamsAsStringList(): string {
    return this.selectedTeams.map(t => t.name).join();
  }

  createMatches() {
    this.apiClient.matches(this.newSeasonID.id).toPromise().catch();
    this.apiClient.matchesAll(this.newSeasonID.id, 1, null, null, null).subscribe(
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
    this.apiClient.start(this.newSeasonID.id).subscribe(
      () => {

      }
    );
  }
}
