import { AsyncPipe } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AllSeasonsFragment, SeasonState } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { EnumTranslatePipe } from '@liga-manager-ui/pipes';
import { SeasonService } from '@liga-manager-ui/services';
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
        EnumTranslatePipe,
        TranslateModule,
        ReactiveFormsModule,
        CypressSelectorDirective,
        TranslateModule,
    ],
})
export class SeasonChooserComponent {

    multiple = input(false);

    @Input({ required: true }) selectedSeasonFC!: FormControl<AllSeasonsFragment | null | undefined>;

    @Input() filterSeasonStates: SeasonState[] = [];

    @Input() clearable = false;

    seasonService = inject(SeasonService);

    SeasonState = SeasonState;

    seasonList$ = this.seasonService.seasonList$.pipe(
        map(
            (seasonList) =>
                seasonList.filter((season) =>
                    this.filterSeasonStates.length > 0
                        ? season?.state &&
                          this.filterSeasonStates.includes(season?.state)
                        : true,
                ) || [],
        ),
    );

}
