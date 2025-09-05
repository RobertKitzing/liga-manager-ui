import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { defaultDialogConfig, EditPitchDialogComponent, PitchComponent } from '@liga-manager-ui/components';
import { PitchService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import fuzzysearch from 'fuzzysearch-ts';
import { map, startWith, switchMap } from 'rxjs';

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
    ],
})
export class ManagePitchesComponent {

    private pitchService = inject(PitchService);

    private dialog = inject(MatDialog);

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

    displayedColumns = [ 'name', 'latitude', 'longitude' ];

    createPitch() {
        this.dialog.open(EditPitchDialogComponent,
            {
                ...defaultDialogConfig,
            },
        );
    }

}
