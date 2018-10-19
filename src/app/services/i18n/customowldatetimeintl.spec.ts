import { async, TestBed } from '@angular/core/testing';
import { AppCoreModule } from '../../app-core.module';
import { CustomOwlDateTimeIntl } from './customowldatetimeintl';
import { TranslateService } from '@ngx-translate/core';

describe('AddteamComponent', () => {

    let customIntl: CustomOwlDateTimeIntl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AppCoreModule
            ],
        });
    }));

    beforeEach(() => {
        customIntl = new CustomOwlDateTimeIntl(TestBed.get(TranslateService));
    });

    it('should create', () => {
        expect(customIntl).toBeTruthy();
    });
});