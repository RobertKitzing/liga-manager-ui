import { Component, input, output, effect, inject, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { startWith, tap } from 'rxjs';
import fuzzysearch from 'fuzzysearch-ts';

@Component({
    selector: 'lima-team-search',
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        TranslateModule,
    ],
    templateUrl: './team-search.component.html',
})
export class TeamSearchComponent implements OnInit {

    teams = input<Maybe<Maybe<Team>[]> | undefined>();

    filteredTeams = output<Maybe<Maybe<Team>[]> | undefined>();

    searchTeam = new FormControl();

    destroyRef = inject(DestroyRef);

    constructor() {
        effect(
            () => {
                this.filteredTeams.emit(this.teams() || []);
            },
        );
    }

    ngOnInit(): void {
        this.searchTeam.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
            startWith(''),
            tap(
                (searchTerm) => {
                    if (!searchTerm) {
                        this.filteredTeams.emit(this.teams());
                    } else {
                        this.filteredTeams.emit(
                            this.teams()?.filter(
                                (y) => 
                                    fuzzysearch(searchTerm.toLocaleLowerCase(), y?.name.toLowerCase() || ''),
                            ),
                        );
                    }
                },
            ),
        ).subscribe();
    }

}
