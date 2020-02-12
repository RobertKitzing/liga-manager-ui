import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { I18Service } from './services/i18.service';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { SnackbarComponent } from './components/shared/snackbar/snackbar.component';
import { GraphQLModule } from './graphql.module';
import { AuthenticationService } from './services/authentication.service';
import { WebStorageModule } from 'ngx-store';
import { AppsettingsService } from './services/appsettings.service';

registerLocaleData(localeDe);

export function i18ServiceFactory(provider: I18Service) {
  return () => provider.init();
}

export function loadAppsettingsFactory(provider: AppsettingsService) {
  return () => provider.init();
}


@NgModule({
  entryComponents: [
    LoginComponent,
    ChangepasswordComponent,
    SnackbarComponent
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
    GraphQLModule,
    WebStorageModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService,
    {
      provide: APP_INITIALIZER,
      useFactory: i18ServiceFactory,
      deps: [I18Service], multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadAppsettingsFactory,
      deps: [AppsettingsService], multi: true
    },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
