import { GOOGLE_MAPS_API_KEY } from './../app.module';
import { I18nService } from './../core/i18n.service';
import { EditMatchDialogComponent } from './../shared/editmatch.modal';
import { SubmitMatchResultBody, Pitch } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { SeasonService } from '@app/service/season.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';

import { environment } from '@env/environment';
import { Client, Season, Match, SeasonState } from '@app/api/openapi';
import { Logger, AuthenticationService } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

const log = new Logger('Matchplan');

@Component({
  selector: 'app-matchplan',
  templateUrl: './matchplan.component.html',
  styleUrls: ['./matchplan.component.scss']
})
export class MatchplanComponent implements OnInit, OnDestroy {

  version: string = environment.version;
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
    @Inject(GOOGLE_MAPS_API_KEY) public mapsApiKey: string) { }

  async ngOnInit() {
    this.loadGoogleMapsScript();
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

  loadGoogleMapsScript() {
    const googleMapsJS = document.getElementById('googelmapsscript');
    if (!googleMapsJS) {
      const tag = document.createElement('script');
      tag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.mapsApiKey + '&libraries=places';
      tag.type = 'text/javascript';
      tag.id = 'googelmapsscript';
      document.body.appendChild(tag);
    }
  }

  async reloadPitches(event: boolean) {
    if (event) {
      this.pitches = await this.loadPitches();
    }
  }
  // updateSingleMatch(matchId: string) {
  //   this.apiClient.getMatch(matchId).subscribe(
  //     (match) => {
  //       const index: number = 0;
  //       for (let i = 0; i < this.matches.length; i++) {
  //         const j: number = this.matches[i].findIndex(x => x.id === matchId);
  //         if (j !== -1) {
  //           this.matches[i][j] = match;
  //           break;
  //         }
  //       }
  //     }
  //   );
  // }

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
