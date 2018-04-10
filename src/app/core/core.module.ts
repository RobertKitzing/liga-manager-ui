import { LoginModule } from './../account/login.module';
import { IsAdminGuard } from './authentication/isadmin.guard';
import { SharedModule } from '@app/shared';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './shell/header/header.component';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { AuthenticationService } from './authentication/authentication.service';
import { I18nService } from './i18n.service';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    AlertModule,
    LoginModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
  ],
  providers: [
    AuthenticationService,
    IsAdminGuard,
    I18nService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ],
  exports: [
    LoginModule,
    AlertModule
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }

}
