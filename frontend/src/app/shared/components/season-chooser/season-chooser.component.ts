import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { EnumTranslatePipe } from '@lima/shared/pipes';
import { SeasonService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { AllSeasonsFragment, SeasonState } from 'src/api/graphql';

export type SeasonChooserModes =
    | 'progressSeason'
    | 'manageSeason'
    | 'historySeason';

@Component({
    selector: 'lima-season-chooser',
    templateUrl: './season-chooser.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        MatSelectModule,
        EnumTranslatePipe,
        TranslateModule,
    ],
})
export class SeasonChooserComponent implements OnInit {

    @Input() mode: SeasonChooserModes = 'progressSeason';

    SeasonState = SeasonState;

    season$!: Observable<AllSeasonsFragment>;

    seasonList$ = this.seasonService.seasonList$.pipe(
        map((seasonList) => {
            switch (this.mode) {
                case 'historySeason':
                    return seasonList?.filter(
                        (s) => s?.state === SeasonState.Ended,
                    );
                case 'progressSeason':
                    return seasonList?.filter(
                        (s) => s?.state === SeasonState.Progress,
                    );
                default:
                    return seasonList;
            }
        }),
    );

    constructor(public seasonService: SeasonService) {}

    ngOnInit() {
        this.season$ = this.seasonService[`${this.mode}$`];
    }

    currentSeasonChanged(event: MatSelectChange) {
        this.seasonService[`${this.mode}$`].next(event.value);
    }

}
