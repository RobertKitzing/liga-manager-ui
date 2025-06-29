import { Component } from '@angular/core';
import { ManageSeasonBase } from '../manage-season.base';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'lima-manage-matchdays',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBase {}
