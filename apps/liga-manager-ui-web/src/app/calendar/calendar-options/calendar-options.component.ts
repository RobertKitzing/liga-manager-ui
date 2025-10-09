import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { map, startWith, switchMap } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { TeamSelectors } from '@liga-manager-ui/states';

export class CalendarOptionsFormGroup extends FormGroup<{
        selectedView: FormControl,
        duration: FormGroup<{
            value: FormControl,
            type: FormControl
        }>,
        team_ids: FormControl<string[]>
    }> {

    constructor(team_ids?: string[]) {
        super({
            selectedView: new FormControl('list', { nonNullable: true }),
            duration: new FormGroup({
                value: new FormControl<number>(1),
                type: new FormControl<'week' | 'month' | 'year'>('week', { nonNullable: true }),
            }),
            team_ids: new FormControl(team_ids || [], { nonNullable: true }),
        });
    }

}

@Component({
    selector: 'lima-calendar-options',
    templateUrl: './calendar-options.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        AsyncPipe,
        MatIcon,
    ],
})
export class CalendarOptionsComponent {

    private store = inject(Store);

    data = inject<{ options: CalendarOptionsFormGroup }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<CalendarOptionsComponent>);

    searchTeam = new FormControl();

    allTeams$ = this.searchTeam.valueChanges.pipe(
        startWith(null),
        switchMap((searchTerm) =>
            !searchTerm
                ? this.store.select(TeamSelectors.teams)
                : this.store.select(TeamSelectors.teams).pipe(
                    map((t) =>
                        t?.filter((x) =>
                            x?.name
                                .toLocaleLowerCase()
                                .includes(searchTerm.toLocaleLowerCase()),
                        ),
                    ),
                ),
        ),
    );

}
