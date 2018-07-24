import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TeamService } from './services/team.service';
import { SeasonService } from './services/season.service';
import { PitchService } from './services/pitch.service';

export function teamServiceFactory(provider: TeamService) {
  return () => provider.load();
}

export function seasonServiceFactory(provider: SeasonService) {
  return () => provider.loadSeasonInProgress();
}

export function pitchServiceFactory(provider: PitchService) {
  return () => provider.load();
}

@NgModule({
  entryComponents: [
    LoginComponent
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent
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
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
