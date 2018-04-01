import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/authentication/authentication.interceptor';
import { TournamentModule } from './tournament/tournament.module';
import { SeasonManagerModule } from './seasonmanager/seasonmanager.module';
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
export const GOOGLE_MAPS_API_KEY = new InjectionToken<string>('GOOGLE_MAPS_API_KEY');

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
    HttpModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AboutModule,
    TableModule,
    MatchplanModule,
    SeasonManagerModule,
    TournamentModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    Client,
    {
      provide: API_BASE_URL,
      useValue: environment.serverUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: GOOGLE_MAPS_API_KEY,
      useValue: 'AIzaSyBo4kTaSyVs6hxw6PV7njib0k9muSx8YM0'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
