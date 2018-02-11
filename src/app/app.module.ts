import { MatchplanModule } from './matchplan/matchplan.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Client, API_BASE_URL } from './api/openopi';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { TableModule } from './table/table.module';
import { AppRoutingModule } from './app-routing.module';

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
    LoginModule,
    TableModule,
    AppRoutingModule,
    HttpClientModule,
    MatchplanModule
  ],
  declarations: [AppComponent],
  providers: [
    Keyboard,
    StatusBar,
    SplashScreen,
    Client,
    {
      provide: API_BASE_URL,
      useValue: 'http://soccer.skilled-by-nature.de'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
