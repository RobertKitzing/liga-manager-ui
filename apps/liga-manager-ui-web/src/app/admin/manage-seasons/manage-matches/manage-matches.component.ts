import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';

@Component({
    selector: 'lima-manage-matches',
    standalone: true,
    imports: [ TranslateModule, CustomDatePipe],
    templateUrl: './manage-matches.component.html',
})
export class ManageMatchesComponent extends ManageSeasonBaseComponent {}
