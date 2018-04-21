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

import { AlertModule } from 'ngx-bootstrap/alert';
import { AuthenticationService } from '@app/service/authentication.service';
import { I18nService } from '@app/service/i18n.service';

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
  providers: [
    AuthenticationService,
    IsAdminGuard,
    I18nService
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
