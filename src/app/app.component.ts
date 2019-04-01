import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { LoginComponent } from './components/login/login.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { environment } from 'src/environments/environment';
import { I18Service } from './services/i18.service';
import { GraphqlSubscriptionService } from 'src/app/services/graphql-subscription.service';
import { RankingGQL, MatchPlanGQL, TournamentGQL } from 'src/api/graphql';
import { SeasonService } from 'src/app/services/season.service';
import { LocalStorage } from 'ngx-store';
import { SELECTED_TOURNAMENT_KEY } from './components/tournament/tournament.component';
import { AppsettingsService } from './services/appsettings.service';
import { Apollo } from 'apollo-angular';
import { GraphqlService } from './services/graphql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @LocalStorage(SELECTED_TOURNAMENT_KEY) tournamentId: string;

  constructor(
    public authService: AuthenticationService,
    public i18Service: I18Service,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private ranking: RankingGQL,
    private matchPlanGQL: MatchPlanGQL,
    private tournamentGQL: TournamentGQL,
    public seasonService: SeasonService,
    private graphqlService: GraphqlService,
    private appsettingsService: AppsettingsService,
    private graphqlSubscriptionService: GraphqlSubscriptionService) {
  }
  async ngOnInit() {

    this.graphqlService.createApolloLink();
    if (this.appsettingsService.appsettings.graphqlWsUrl) {
      this.graphqlSubscriptionService.connect();
    }

    if (this.authService.accessToken) {
      this.authService.loadUser();
    }
    this.loadGoogleMapsScript();
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent);
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangepasswordComponent);
  }

  loadGoogleMapsScript() {
    const googleMapsJS = document.getElementById('googelmapsscript');
    if (!googleMapsJS) {
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
      await this.matchPlanGQL.fetch({ id: this.seasonService.currentSeason.getValue().id }, { fetchPolicy: 'network-only' }).toPromise();
    }
    if (this.tournamentId) {
      await this.tournamentGQL.fetch({ id: this.tournamentId }, { fetchPolicy: 'network-only' }).toPromise();
    }
  }
}
