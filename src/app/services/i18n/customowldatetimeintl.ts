import { Injectable } from '@angular/core';
import { OwlDateTimeIntl } from 'ng-pick-datetime';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomOwlDateTimeIntl extends OwlDateTimeIntl {
  constructor(private translationService: TranslateService) {
    super();
    this.translationService.get('BUTTON.SAVE').subscribe(
      (save) => {
        this.setBtnLabel = save;
      }
    );
    this.translationService.get('BUTTON.CANCEL').subscribe(
      (cancel) => {
        this.cancelBtnLabel = cancel;
      }
    );
  }
}
