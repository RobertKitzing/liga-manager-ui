import { Component, input, effect, inject, DestroyRef, ViewChild, output, forwardRef, Injector, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroup, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';
import fuzzysearch from 'fuzzysearch-ts';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { CypressSelectorDirective, CySelectors } from '@liga-manager-ui/directives';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'lima-team-auto-complete',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        TranslateModule,
        MatAutocompleteModule,
        AsyncPipe,
        FormsModule,
        CypressSelectorDirective,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './team-auto-complete.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TeamAutoCompleteComponent),
            multi: true,
        },
    ],
})
export class TeamAutoCompleteComponent implements ControlValueAccessor, OnInit {

    teamFormControl!: FormControl;

    cySelector = input<CySelectors>('input-team-auto-complete');

    teams = input<Maybe<Maybe<Team>[]> | undefined>();

    disabledTeams = input<Maybe<Maybe<Team>[]> | undefined>([]);

    clearAfterSelected = input(false);

    teamSelected = output<Team>();

    destroyRef = inject(DestroyRef);

    filteredTeams$!: Observable<Maybe<Maybe<Team>[]>>;

    @ViewChild(MatAutocomplete) autoComplete!: MatAutocomplete;

    constructor() {
        effect(
            () => {
                this.filteredTeams$ = this.teamFormControl.valueChanges.pipe(
                    startWith(''),
                    map(
                        (searchTerm) => this.filterTeams(searchTerm) || [],
                    ),
                );
                this.teamFormControl.setValue(this.teamFormControl.value);
            },
        );
    }

    private injector = inject(Injector);

    ngOnInit() {
        const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

        if (ngControl instanceof FormControlDirective) {
            this.teamFormControl = ngControl.control;
        } else if (ngControl instanceof FormControlName) {
            const container = this.injector.get(ControlContainer).control as FormGroup;
            this.teamFormControl = container.controls[ngControl.name!] as FormControl;
        } else {
            this.teamFormControl = new FormControl();
        }
    }

    _teamSelected(option: MatAutocompleteSelectedEvent) {
        if (option.option.value) {
            this.teamFormControl.setValue(option.option.value);
            this.teamSelected.emit(option.option.value);
            if (this.clearAfterSelected()) {
                this.teamFormControl.reset();
            }
        }
    }

    displayWith(team: Team) {
        return team?.name;
    }

    private filterTeams(searchTerm?: string | Team) {
        if (typeof searchTerm !== 'string') {
            searchTerm = searchTerm?.name;
        }
        let t = this.teams()?.filter((t) => t && !this.disabledTeams()?.find((dt) => dt?.id === t.id));
        if (searchTerm) {
            t = this.teams()?.filter(
                (y) =>
                    fuzzysearch(searchTerm.toLocaleLowerCase(), y?.name.toLowerCase() || ''),
            );
        }
        return t;
    }

    writeValue() { }

    registerOnChange() { }

    registerOnTouched() { }

}
