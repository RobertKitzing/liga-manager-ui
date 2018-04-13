import { MatchService } from './service/match.service';
import { WebsocketService } from './service/websocket.service';
import { AuthInterceptor } from './core/authentication/authentication.interceptor';
import { TournamentModule } from './tournament/tournament.module';
import { MatchplanModule } from './matchplan/matchplan.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Client, API_BASE_URL } from './api/openapi';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { TableModule } from './table/table.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from '@app/admin/admin.module';
import { LoginModule } from '@app/account/login.module';
import { ChangePasswordModule } from '@app/account/changepassword/changepassword.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReportModule } from '@app/reports/reports.module';
export const GOOGLE_MAPS_API_KEY = new InjectionToken<string>('GOOGLE_MAPS_API_KEY');

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    ReportModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    TableModule,
    MatchplanModule,
    TournamentModule,
    AdminModule,
    AlertModule.forRoot(),
    ChangePasswordModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    WebsocketService,
    MatchService,
    Keyboard,
    StatusBar,
    SplashScreen,
    Client,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: API_BASE_URL,
      useValue: environment.serverUrl
    },
    {
      provide: GOOGLE_MAPS_API_KEY,
      useValue: environment.googleMapsApiKey
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
