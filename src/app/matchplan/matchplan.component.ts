import { EditMatchDialogComponent } from './../shared/editmatch.modal';
import { SubmitMatchResultBody } from './../api/openapi';
import { TeamService } from './../service/team.service';
import { SeasonService } from '@app/service/season.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { environment } from '@env/environment';
import { Client, Season, Match, SeasonState } from '@app/api/openapi';
import { Logger } from '@app/core';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';

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
  season: Season;

  matches: Match[][];
  matchDay = 1;
  isLoadingMatches: boolean;
  matchDayCounter: number[] = new Array<number>();

  editMatch: string;

  constructor(private apiClient: Client,
              public seasonService: SeasonService,
              public teamService: TeamService,
              public dialog: MatDialog) { }

  async ngOnInit() {
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
  }

  openEditDialog(matchId: string) {
    const dialogRef = this.dialog.open(EditMatchDialogComponent, {
      data: { matchId: matchId }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.updateSingleMatch(result.matchId);
        }
    });
  }

  updateSingleMatch(matchId: string)  {
    this.apiClient.getMatch(matchId).subscribe(
      (match) => {
        const index = this.matches[match.match_day - 1].findIndex(t => t.id === matchId);
        if (index !== -1) {
          this.matches[match.match_day - 1][index] = match;
        }
      }
    );
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
    if ( this.matchDay === 0) {
      for (let i = 1; i <= this.season.match_day_count; i++) {
        this.apiClient.getMatchesInSeason(this.season.id, i, null, null, null).subscribe(
          (matches: Match[]) => {
            this.matches[i - 1] = matches;
            log.debug('index', i);
            log.debug(this.matches);
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
          this.matches.push(matches);
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

  seasonCompare(c1: Season, c2: Season) {
    return c1 && c2 && c1.id === c2.id;
  }
}
