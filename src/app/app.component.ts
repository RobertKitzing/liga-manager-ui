import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { I18Service } from './services/i18.service';
import { RankingGQL, SeasonGQL, TournamentGQL, Tournament, AllSeasonsListGQL } from 'src/api/graphql';
import { SeasonService } from 'src/app/services/season.service';
import { LocalStorage } from 'ngx-webstorage';
import { SELECTED_TOURNAMENT_KEY } from './components/tournament/tournament.component';
import { AppsettingsService } from './services/appsettings.service';
import { LoadingIndicatorService } from './services/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public loadingIndicatorService: LoadingIndicatorService,
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private ranking: RankingGQL,
    private seasonGQL: SeasonGQL,
    private tournamentGQL: TournamentGQL,
    public seasonService: SeasonService,
    private appsettingsService: AppsettingsService,
    private allSeasonsListGQL: AllSeasonsListGQL,
  ) {
  }
  async ngOnInit() {

    if (this.authService.accessToken) {
      this.authService.loadUser();
    }
    this.loadGoogleMapsScript();

    await this.allSeasonsListGQL.fetch().toPromise();
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangepasswordComponent);
  }

  loadGoogleMapsScript() {
    const googleMapsJS = document.getElementById('googelmapsscript');
    if (!googleMapsJS && this.appsettingsService.appsettings.googleMapsApiKey) {
      const tag = document.createElement('script');
      tag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.appsettingsService.appsettings.googleMapsApiKey + '&libraries=places';
      tag.type = 'text/javascript';
      tag.id = 'googelmapsscript';
      document.body.appendChild(tag);
    }
  }

  onLangSelect(lang: string) {
    this.i18Service.changeLang(lang);
  }

  async refresh() {
    if (this.seasonService.currentSeason.getValue()) {
      await this.ranking.fetch({ id: this.seasonService.currentSeason.getValue().id }, { fetchPolicy: 'network-only' }).toPromise();
    }
    if (this.seasonService.currentSeason.getValue()) {
      await this.seasonGQL.fetch({ id: this.seasonService.currentSeason.getValue().id }, { fetchPolicy: 'network-only' }).toPromise();
    }
    // if (this.tournament.id) {
    //   await this.tournamentGQL.fetch({ id: this.tournament.id }, { fetchPolicy: 'network-only' }).toPromise();
    // }
  }
}
