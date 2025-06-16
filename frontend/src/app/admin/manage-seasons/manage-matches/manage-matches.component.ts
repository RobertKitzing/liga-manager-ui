import { Component } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDateModule } from '@lima/shared/pipes';

@Component({
    selector: 'lima-manage-matches',
    standalone: true,
    imports: [
        AsyncPipe,
        TranslateModule,
        CustomDateModule,
    ],
    templateUrl: './manage-matches.component.html',
})
export class ManageMatchesComponent extends ManageSeasonBase {

}
