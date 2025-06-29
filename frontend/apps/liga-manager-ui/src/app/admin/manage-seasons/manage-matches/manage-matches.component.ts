import { Component } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDatePipe } from '@liga-manager-ui/pipes';

@Component({
    selector: 'lima-manage-matches',
    standalone: true,
    imports: [AsyncPipe, TranslateModule, CustomDatePipe],
    templateUrl: './manage-matches.component.html',
})
export class ManageMatchesComponent extends ManageSeasonBase {}
