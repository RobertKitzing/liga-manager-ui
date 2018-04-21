import { WebsocketService } from '@app/service/websocket.service';
import { GOOGLE_MAPS_API_KEY } from './../app.module';
import { SubmitMatchResultBody, Pitch } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { SeasonService } from '@app/service/season.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { environment } from '@env/environment';
import { Client, Season, Match, SeasonState } from '@app/api/openapi';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '@app/service/authentication.service';
import { Logger } from '@app/service/logger.service';
import { I18nService } from '@app/service/i18n.service';

const log = new Logger('Matchplan');

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.scss']
})
export class MatchplanComponent implements OnInit, OnDestroy {

  seasons: Season[];
  seasonsSub: Subscription;
  season: Season;

  matches: Match[][];
  matchDay = 1;
  isLoadingMatches: boolean;
  matchDayCounter: number[] = new Array<number>();

  editMatch: string;
  pitches: Pitch[];

  constructor(private apiClient: Client,
    public seasonService: SeasonService,
    public teamService: TeamService,
    public i18Service: I18nService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public webSocketService: WebsocketService) { }

  async ngOnInit() {
    this.webSocketService.pitchAdded.subscribe(
      (pitchId) => {
        this.reloadPitches();
      }
    );

    this.seasonsSub = this.seasonService.season.subscribe(
      (season) => {
        log.debug(season);
        this.season = season;
        this.matchDayCounter = new Array();
        for (let i = 0; i <= season.match_day_count; i++) {
          this.matchDayCounter.push(i);
        }
        this.loadMatches();
      }
    );
    this.season = this.seasonService.getSelectedSeason();
    if (this.season) {
      this.matchDayCounter = new Array();
      for (let i = 0; i <= this.season.match_day_count; i++) {
        this.matchDayCounter.push(i);
      }
    }
    this.seasons = await this.seasonService.getSeasons(SeasonState.Progress);
    if (this.season) {
      this.loadMatches();
    }
    this.pitches = await this.loadPitches();
  }

  async reloadPitches() {
    this.pitches = await this.loadPitches();
  }

  ngOnDestroy() {
    this.seasonsSub.unsubscribe();
  }

  selectedMatchDayChanged() {
    this.loadMatches();
  }

  selectedSeasonChanged(s: Season) {
    this.seasonService.selectSeason(s);
  }

  loadMatches() {
    this.isLoadingMatches = true;
    this.matches = new Array<Match[]>();
    if (this.matchDay === 0) {
      for (let i = 1; i <= this.season.match_day_count; i++) {
        this.apiClient.getMatchesInSeason(this.season.id, i, null, null, null).subscribe(
          (matches: Match[]) => {
            this.matches[i - 1] = matches;
          },
          (error) => {
            log.error(error);
          },
          () => {
            this.isLoadingMatches = false;
          }
        );
      }
    } else {
      this.apiClient.getMatchesInSeason(this.season.id, this.matchDay, null, null, null).subscribe(
        (matches: Match[]) => {
          this.matches = new Array<Match[]>();
          this.matches.push(matches);
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
  }

  async loadPitches(): Promise<Pitch[]> {
    return new Promise<Pitch[]>(
      (resolve) => {
        this.apiClient.getAllPitches().subscribe(
          (pitches) => {
            resolve(pitches);
          },
          (error) => {
            resolve(null);
          }
        );
      }
    );
  }
}
