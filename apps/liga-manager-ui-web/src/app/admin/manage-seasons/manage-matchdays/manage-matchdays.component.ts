import { Component, signal } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePeriod } from '@liga-manager-api/graphql';
import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'lima-manage-matchdays',
    standalone: true,
    imports: [
        TranslateModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        DatePipe,
    ],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBaseComponent {

    seasonStartDate = new FormControl<Date | undefined>(undefined);

    secondHalf = new FormControl(false);

    betweenMatchDaysOffset = new FormControl<number>(7, { nonNullable: true });

    fromToOffset = new FormControl<number>(2, { nonNullable: true });

    matchDays = signal<DatePeriod[]>([]);

    createMatchDays() {
        if (this.season?.teams) {
            this.matchDays.set([]);
            let length = this.season.teams.length;
            if (length % 2 !== 0) {
                length += 1;
            }
            if (this.secondHalf.value) {
                length = (length * 2) - 1;
            }
            for (let i = 0; i < length - 1; i++) {

                const dp = {} as DatePeriod;

                dp.from = dayjs(this.seasonStartDate.value).add( i * this.betweenMatchDaysOffset.value, 'day').toDate();
                dp.to = dayjs(dp.from).add(this.fromToOffset.value, 'day').toDate();
                this.matchDays().push(dp);
            }
        }
    }

}
