import { NgModule } from '@angular/core';
import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { CustomOwlDateTimeIntl } from 'src/app/services/i18n/customowldatetimeintl';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule.forChild()
  ],
  providers: [
    {
      provide: OwlDateTimeIntl,
      useClass: CustomOwlDateTimeIntl
    }
  ]
})
export class AppCoreModule { }
