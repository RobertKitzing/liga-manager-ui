import { Subscription } from 'rxjs/Subscription';
import { SeasonService } from '@app/service/season.service';
import { Client, Season, Ranking, Team, SeasonState } from './../api/openapi';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { environment } from '@env/environment';
import { MatTableDataSource, MatSort, Sort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Logger } from '@app/core';

const log = new Logger('Seasonmanager');

@Component({
  selector: 'app-seasonmanager',
  templateUrl: './seasonmanager.component.html',
  styleUrls: ['./seasonmanager.component.scss']
})
export class SeasonManagerComponent {

  constructor(private apiClient: Client,
              private seasonService: SeasonService) {
              }

}
