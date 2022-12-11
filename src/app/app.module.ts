import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingIndicatorHttpInterceptor } from './loading-indicator-http-interceptor';
import { ApolloModule } from 'apollo-angular'
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { GraphqlService } from './services/graphql.service';

export function graphqlFactory(provider: GraphqlService) {
  return () => provider.init();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    ApolloModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    MatInputModule,
    MatListModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: graphqlFactory,
      deps: [GraphqlService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingIndicatorHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
