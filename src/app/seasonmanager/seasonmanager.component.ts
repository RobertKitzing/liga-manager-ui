import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState, Body5 } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
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

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  allTeams: Team[];
  isLoadingAllTeams: boolean;

  constructor(private apiClient: Client,
              private seasonService: SeasonService,
              private _formBuilder: FormBuilder) {
              }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  createSeasonStepperChanged(event: StepperSelectionEvent) {
    log.debug(event);
    switch (event.selectedIndex) {
      case 1:
        this.loadAllTeams();
    }
  }

  loadAllTeams() {
    this.isLoadingAllTeams = true;
    this.apiClient.team().subscribe(
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

  createSeason(name: string) {
    const opt: Body5 = new Body5();
    opt.name = name;
    this.apiClient.season(opt).subscribe(
      () => {
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
}
