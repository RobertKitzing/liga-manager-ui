import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';

@Component({
    selector: 'lima-manage-penalties',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './manage-penalties.component.html',
})
export class ManagePenaltiesComponent extends ManageSeasonBaseComponent {}
