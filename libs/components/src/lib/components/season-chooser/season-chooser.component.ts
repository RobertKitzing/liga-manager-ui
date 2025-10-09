import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Injector, input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroup, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SeasonState } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { SeasonService } from '@liga-manager-ui/services';
import { SeasonSelectors, SeasonStateModel } from '@liga-manager-ui/states';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'lima-season-chooser',
    templateUrl: './season-chooser.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        MatSelectModule,
        TranslateModule,
        ReactiveFormsModule,
        CypressSelectorDirective,
        TranslateModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SeasonChooserComponent),
            multi: true,
        },
    ],
})
export class SeasonChooserComponent implements ControlValueAccessor, OnInit {

    private injector = inject(Injector);

    private store = inject(Store);

    showState = input<boolean>(false);

    multiple = input(false);

    filterStates = input<SeasonState[] | null>(null);

    clearable = input<boolean>(false);

    seasonService = inject(SeasonService);

    seasonFormControl!: FormControl<string>;

    SeasonState = SeasonState;

    seasonList$!: Observable<SeasonStateModel['seasons']>;

    ngOnInit() {

        this.seasonList$ = this.store.select(SeasonSelectors.seasons(this.filterStates()));

        const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

        if (ngControl instanceof FormControlDirective) {
            this.seasonFormControl = ngControl.control;
        } else if (ngControl instanceof FormControlName) {
            const container = this.injector.get(ControlContainer).control as FormGroup;
            this.seasonFormControl = container.controls[ngControl.name!] as FormControl;
        } else {
            this.seasonFormControl = new FormControl();
        }
    }

    writeValue() { }

    registerOnChange() { }

    registerOnTouched() { }

}
