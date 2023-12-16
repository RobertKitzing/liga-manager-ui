import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AllSeasonsFragment, SeasonState } from '@api/graphql';
import { EnumTranslateModule } from '@lima/shared/pipes';
import { SeasonService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

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
        EnumTranslateModule,
        TranslateModule,
        ReactiveFormsModule,
    ],
})
export class SeasonChooserComponent {

    @Input({ required: true })
    selectedSeasonFC!: FormControl<AllSeasonsFragment | null>;

    @Input()
    filterSeasonStates: SeasonState[] = [];

    SeasonState = SeasonState;

    seasonList$ = this.seasonService.seasonList$.pipe(
        map(
            (seasonList) => seasonList.filter((season) => this.filterSeasonStates.length > 0 ? this.filterSeasonStates.includes(season?.state!) : true),
        ),
    );

    constructor(public seasonService: SeasonService) {}

}
