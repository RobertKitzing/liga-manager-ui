import { Component } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'lima-manage-matchdays',
    standalone: true,
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
    ],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBaseComponent {

    seasonStartDate = new FormControl<Date | undefined>(undefined);

    createMatchDays() {
        console.log(this.season);
    }

}
