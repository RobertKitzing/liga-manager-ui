import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { SelectedItemsSelectors, SetSelectedCalendarOptions, TeamSelectors } from '@liga-manager-ui/states';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class CalendarOptionsFormGroup extends FormGroup<{
        selectedView: FormControl,
        duration: FormGroup<{
            value: FormControl,
            type: FormControl
        }>,
        teamIds: FormControl<string[]>
    }> {

    private destroyRef = inject(DestroyRef);

    private store = inject(Store);

    constructor() {
        super({
            selectedView: new FormControl('list', { nonNullable: true }),
            duration: new FormGroup({
                value: new FormControl<number>(1),
                type: new FormControl<'week' | 'month' | 'year'>('month', { nonNullable: true }),
            }),
            teamIds: new FormControl([], { nonNullable: true }),
        });

        const selectedCalendarOptions = this.store.selectSnapshot(SelectedItemsSelectors.selectedCalendarOptions);
        this.controls.teamIds.setValue(selectedCalendarOptions.teamIds || []);
        this.controls.selectedView.setValue(selectedCalendarOptions.selectedView || 'list');
        this.controls.duration.setValue({
            type: selectedCalendarOptions.duration?.type,
            value: selectedCalendarOptions.duration?.value,
        });

        this.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (value) => {
                this.store.dispatch(new SetSelectedCalendarOptions({
                    duration: {
                        type: value.duration?.type || 'month',
                        value: value.duration?.value,
                    },
                    selectedView: value.selectedView,
                    teamIds: value.teamIds?.join(',') || '',
                }));
            },
        );
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

    options = new CalendarOptionsFormGroup();

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
