import { Component, inject, signal } from '@angular/core';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DatePeriod, SeasonFragment } from '@liga-manager-api/graphql';
import dayjs from 'dayjs';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from '@liga-manager-ui/services';
import { MatButtonModule } from '@angular/material/button';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

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
        MatCardModule,
        MatButtonModule,
        CypressSelectorDirective,
    ],
    templateUrl: './manage-matchdays.component.html',
})
export class ManageMatchdaysComponent extends ManageSeasonBaseComponent {

    seasonStartDate = new FormControl<Date | undefined>(undefined);

    secondHalf = new FormControl(false);

    betweenMatchDaysOffset = new FormControl<number>(7, { nonNullable: true });

    fromToOffset = new FormControl<number>(2, { nonNullable: true });

    matchDays = signal<DatePeriod[]>([]);

    private translateService = inject(TranslateService);

    private notificationService = inject(NotificationService);

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

    async saveMatchDays(manageSeason: SeasonFragment) {
        try {
  
            if (!manageSeason.match_days || manageSeason.match_days.length !== this.matchDays().length) {
                await this.seasonService.createMatchesForSeason({
                    season_id: manageSeason.id,
                    dates: this.matchDays(),
                });
            } else {
                // this.rescheduleMatchDays(manageSeason);
            }
  
            this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_MATCH_DAYS_SUCCESS'));
        } catch (error) {
            console.error(error);
        }
    }

}
