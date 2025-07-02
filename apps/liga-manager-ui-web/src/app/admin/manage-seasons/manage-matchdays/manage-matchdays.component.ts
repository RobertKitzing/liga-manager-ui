import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';

@Component({
    selector: 'lima-manage-matchdays',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBaseComponent {}
