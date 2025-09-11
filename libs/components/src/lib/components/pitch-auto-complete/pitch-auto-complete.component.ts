import { Component, input, inject, DestroyRef, ViewChild, output, forwardRef, OnInit, Injector } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, FormsModule, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
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
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PitchAutoCompleteComponent),
            multi: true,
        },
    ],
})
export class PitchAutoCompleteComponent implements OnInit, ControlValueAccessor{

    fromControl?: FormControl;

    cySelector = input<CySelectors>('input-pitch-auto-complete');

    pitches = input<Maybe<Maybe<Pitch>[]> | undefined>();

    clearAfterSelected = input(false);

    pitchSelected = output<Pitch>();

    destroyRef = inject(DestroyRef);

    filteredPitches$!: Observable<Maybe<Maybe<Pitch>[]>>;

    @ViewChild(MatAutocomplete) autoComplete!: MatAutocomplete;

    injector = inject(Injector);

    ngOnInit(): void {
        const ngControl = this.injector.get(NgControl);

        if (ngControl instanceof FormControlName) {
            this.fromControl =  this.injector.get(FormGroupDirective).getControl(ngControl);
        } else {
            this.fromControl = (ngControl as FormControlDirective).form;
        }

        this.filteredPitches$ = this.fromControl.valueChanges.pipe(
            startWith(''),
            map(
                (searchTerm) => this.filterPitches(searchTerm) || [],
            ),
        );
        this.fromControl.setValue(this.fromControl.value);
    }

    writeValue(_obj: unknown): void {
    }

    registerOnChange(_fn: unknown): void {
    }

    registerOnTouched(_fn: unknown): void {
    }

    setDisabledState?(_isDisabled: boolean): void {
    }

    _pitchSelected(option: MatAutocompleteSelectedEvent) {
        if (option.option.value) {
            this.fromControl?.setValue(option.option.value);
            this.pitchSelected.emit(option.option.value);
            if (this.clearAfterSelected()) {
                this.fromControl?.reset();
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
            );
        }
        return t;
    }

}
