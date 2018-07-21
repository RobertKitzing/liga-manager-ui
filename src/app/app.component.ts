import { Component, OnInit, ViewChild } from '@angular/core';
import { SeasonService } from './services/season.service';
import { Season, SeasonState } from '../api';
import { MatSelectChange, MatSelect } from '@angular/material/select';
import { TeamService } from 'src/app/services/team.service';
import { PitchService } from './services/pitch.service';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seasons: Season[];
  @ViewChild('seasonSelect') seasonSelect: MatSelect;

  constructor(
    public seasonService: SeasonService,
    private teamService: TeamService,
    private pitchService: PitchService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {
  }

  async ngOnInit() {
    await this.authService.loadUser();
    this.seasons = await this.seasonService.loadSeasons(SeasonState.Progress);
    await this.teamService.loadTeams();
    await this.pitchService.loadPitches();
    this.seasonService.currentSeason.subscribe(
      (seasonId) => {
        this.seasonSelect.value = seasonId;
      }
    );
  }

  currentSeasonChanged(event: MatSelectChange) {
    this.seasonService.currentSeason.next(event.value);
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent);
  }
}
