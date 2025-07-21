import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'lima-manage-matches',
    standalone: true,
    imports: [TranslateModule, CustomDatePipe, MatSelectModule, MatDatepickerModule],
    templateUrl: './manage-matches.component.html',
})
export class ManageMatchesComponent extends ManageSeasonBaseComponent {}
