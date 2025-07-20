import { Component, input, effect, inject, DestroyRef, ViewChild, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';
import fuzzysearch from 'fuzzysearch-ts';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { CypressSelectorDirective, CySelectors } from '@liga-manager-ui/directives';

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
    ],
    templateUrl: './team-auto-complete.component.html',
})
export class TeamAutoCompleteComponent {

    fromControl = input<FormControl>(new FormControl());

    cySelector = input<CySelectors>('input-team-auto-complete');

    teams = input<Maybe<Maybe<Team>[]> | undefined>();

    clearAfterSelected = input(false);

    teamSelected = output<Team>();

    destroyRef = inject(DestroyRef);

    filteredTeams$!: Observable<Maybe<Maybe<Team>[]>>;

    @ViewChild(MatAutocomplete) autoComplete!: MatAutocomplete;

    constructor() {
        effect(
            () => {
                this.filteredTeams$ = this.fromControl().valueChanges.pipe(
                    startWith(''),
                    map(
                        (searchTerm) => this.filterTeams(searchTerm) || [],
                    ),
                );
                this.fromControl().setValue(this.fromControl()?.value)
            },
        );
    }

    _teamSelected(option: MatAutocompleteSelectedEvent) {
        if (option.option.value) {
            this.fromControl().setValue(option.option.value)
            this.teamSelected.emit(option.option.value);
            if (this.clearAfterSelected()) {
                this.fromControl().reset();
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
        let t = this.teams();
        if (searchTerm) {
            t = this.teams()?.filter(
                (y) => 
                    fuzzysearch(searchTerm.toLocaleLowerCase(), y?.name.toLowerCase() || ''),
            )
        }
        return t;
    }

}
