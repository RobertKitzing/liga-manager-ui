import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';

@Component({
    selector: 'lima-manage-schedule-matches',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './manage-schedule-matches.component.html',
})
export class ManageScheduleMatchesComponent extends ManageSeasonBaseComponent {}
