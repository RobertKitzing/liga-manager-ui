import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TeamService } from './services/team.service';
import { SeasonService } from './services/season.service';
import { PitchService } from './services/pitch.service';
import { I18Service } from './services/i18.service';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { API_BASE_URL } from '../api';
import { environment } from '../environments/environment';
import { WebsocketService } from './services/websocket.service';
registerLocaleData(localeDe);

export function teamServiceFactory(provider: TeamService) {
  return () => provider.load();
}

export function seasonServiceFactory(provider: SeasonService) {
  return () => provider.loadSeasonInProgress();
}

export function pitchServiceFactory(provider: PitchService) {
  return () => provider.load();
}

export function i18ServiceFactory(provider: I18Service) {
  return () => provider.init();
}

export function websocketServiceFactory(provider: WebsocketService) {
  return () => provider.init();
}

@NgModule({
  entryComponents: [
    LoginComponent,
    ChangepasswordComponent
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: i18ServiceFactory,
      deps: [I18Service], multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: teamServiceFactory,
      deps: [TeamService], multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: seasonServiceFactory,
      deps: [SeasonService], multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: pitchServiceFactory,
      deps: [PitchService], multi: true
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 2500 }
    },
    {
      provide: API_BASE_URL,
      useValue: environment.serverUrl
    },
    {
      provide: APP_INITIALIZER,
      useFactory: websocketServiceFactory,
      deps: [WebsocketService], multi: true
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
