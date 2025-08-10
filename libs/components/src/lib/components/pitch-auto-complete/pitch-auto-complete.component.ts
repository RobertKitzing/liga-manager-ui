import { Component, input, effect, inject, DestroyRef, ViewChild, output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Maybe, Pitch } from '@liga-manager-api/graphql';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable, startWith } from 'rxjs';
import fuzzysearch from 'fuzzysearch-ts';
import { MatAutocomplete, MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { CypressSelectorDirective, CySelectors } from '@liga-manager-ui/directives';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'lima-pitch-auto-complete',
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
    templateUrl: './pitch-auto-complete.component.html',
})
export class PitchAutoCompleteComponent {

    fromControl = input<FormControl>(new FormControl());

    cySelector = input<CySelectors>('input-pitch-auto-complete');

    pitches = input<Maybe<Maybe<Pitch>[]> | undefined>();

    clearAfterSelected = input(false);

    pitchSelected = output<Pitch>();

    destroyRef = inject(DestroyRef);

    filteredPitches$!: Observable<Maybe<Maybe<Pitch>[]>>;

    @ViewChild(MatAutocomplete) autoComplete!: MatAutocomplete;

    constructor() {
        effect(
            () => {
                this.filteredPitches$ = this.fromControl().valueChanges.pipe(
                    startWith(''),
                    map(
                        (searchTerm) => this.filterPitches(searchTerm) || [],
                    ),
                );
                this.fromControl().setValue(this.fromControl()?.value)
            },
        );
    }

    _pitchSelected(option: MatAutocompleteSelectedEvent) {
        if (option.option.value) {
            this.fromControl().setValue(option.option.value)
            this.pitchSelected.emit(option.option.value);
            if (this.clearAfterSelected()) {
                this.fromControl().reset();
            }
        }
    }

    displayWith(pitch: Pitch) {
        return pitch?.label;
    }

    private filterPitches(searchTerm?: string | Pitch) {
        if (typeof searchTerm !== 'string') {
            searchTerm = searchTerm?.label;
        }
        let t = this.pitches();
        if (searchTerm) {
            t = this.pitches()?.filter(
                (y) => 
                    fuzzysearch(searchTerm.toLocaleLowerCase(), y?.label.toLowerCase() || ''),
            )
        }
        return t;
    }

}
