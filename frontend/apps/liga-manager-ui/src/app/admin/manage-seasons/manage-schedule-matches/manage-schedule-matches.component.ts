import { Component } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lima-manage-schedule-matches',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './manage-schedule-matches.component.html',
})
export class ManageScheduleMatchesComponent extends ManageSeasonBase {}
