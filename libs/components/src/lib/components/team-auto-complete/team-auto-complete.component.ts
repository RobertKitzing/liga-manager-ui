import { Component, input, effect, inject, DestroyRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';
import fuzzysearch from 'fuzzysearch-ts';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

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
    ],
    templateUrl: './team-auto-complete.component.html',
})
export class TeamAutoCompleteComponent {

    fromControl = input<FormControl>();

    teams = input<Maybe<Maybe<Team>[]> | undefined>();

    destroyRef = inject(DestroyRef);

    autoCompleteControl = new FormControl();

    filteredTeams$!: Observable<Maybe<Maybe<Team>[]>>;

    constructor() {
        effect(
            () => {
                this.filteredTeams$ = this.autoCompleteControl.valueChanges.pipe(
                    startWith(''),
                    map(
                        (searchTerm) => this.filterTeams(searchTerm) || [],
                    ),
                );
                console.log('test');
                this.autoCompleteControl.setValue(this.fromControl()?.value?.name)
            },
        );
    }

    _teamSelected(option: MatAutocompleteSelectedEvent) {
        if (option.option.value) {
            this.fromControl()?.setValue(option.option.value)
        }
    }

    displayWith(team: Team) {
        return team?.name;
    }

    private filterTeams(searchTerm?: string) {
        if (!searchTerm || typeof searchTerm !== 'string') {
            return this.teams()
        }
        return this.teams()?.filter(
            (y) => 
                fuzzysearch(searchTerm.toLocaleLowerCase(), y?.name.toLowerCase() || ''),
        );
    }

}
