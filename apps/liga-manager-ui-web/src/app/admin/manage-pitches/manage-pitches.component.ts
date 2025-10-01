import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ConfirmComponent, defaultDialogConfig, EditPitchDialogComponent, PitchComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { SortByPipe } from '@liga-manager-ui/pipes';
import { PitchService } from '@liga-manager-ui/services';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import fuzzysearch from 'fuzzysearch-ts';
import { firstValueFrom, map, startWith, switchMap } from 'rxjs';

@Component({
    selector: 'lima-manage-pitches',
    templateUrl: './manage-pitches.component.html',
    standalone: true,
    imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        TranslateModule,
        MatInputModule,
        AsyncPipe,
        MatTableModule,
        PitchComponent,
        SortByPipe,
        CypressSelectorDirective,
    ],
})
export class ManagePitchesComponent {

    private pitchService = inject(PitchService);

    private dialog = inject(MatDialog);

    private translateService = inject(TranslateService);

    private destroyRef = inject(DestroyRef);

    searchPitch = new FormControl();

    pitches$ = this.searchPitch.valueChanges.pipe(
        startWith(null),
        switchMap(
            (searchTerm) =>
                !searchTerm
                    ? this.pitchService.allPitches$
                    : this.pitchService.allPitches$.pipe(
                        map((x) => x?.filter((y) => fuzzysearch(searchTerm.toLowerCase(), y?.label.toLowerCase() || '') )),
                    ),
        ),
    );

    displayedColumns = [ 'name', 'latitude', 'longitude', 'action' ];

    createPitch() {
        this.dialog.open(EditPitchDialogComponent,
            {
                ...defaultDialogConfig,
            },
        );
    }

    deletePitch(pitch_id: string) {
        this.dialog.open(ConfirmComponent,
            {
                ...defaultDialogConfig,
                data: {
                    body: this.translateService.instant('ARE_YOU_SURE_TO_DELETE_THIS_PITCH'),
                },
            },
        ).afterClosed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                async (result) => {
                    if (result) {
                        try {
                            await firstValueFrom(this.pitchService.deletePitch({ pitch_id }));
                        } catch (error) {
                            console.error(error);
                        }
                    }
                },
            );
    }

}
