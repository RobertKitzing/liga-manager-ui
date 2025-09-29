import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Injector, input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroup, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TournamentState } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
    selector: 'lima-tournament-chooser',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        MatSelectModule,
        TranslateModule,
        CypressSelectorDirective,
    ],
    templateUrl: './tournament-chooser.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TournamentChooserComponent),
            multi: true,
        },
    ],
})
export class TournamentChooserComponent implements ControlValueAccessor, OnInit {

    private injector = inject(Injector);

    selectedTournamentFC!: FormControl<string>;

    TournamentState = TournamentState;

    filterStates = input<TournamentState[] | null>(null);

    clearable = input<boolean>(false);

    showState = input<boolean>(false);

    tournamentService = inject(TournamentService);

    tournamentList$ = this.tournamentService.allTournaments$.pipe(
        map(
            (tournamentList) =>
                tournamentList.filter(
                    (tournament) => {
                        if (!this.filterStates()) {
                            return true;
                        }
                        return this.filterStates()?.includes(tournament.state);
                    },
                ),
        ),
    );

    ngOnInit() {
        const ngControl = this.injector.get(NgControl, null, { self: true, optional: true });

        if (ngControl instanceof FormControlDirective) {
            this.selectedTournamentFC = ngControl.control;
        } else if (ngControl instanceof FormControlName) {
            const container = this.injector.get(ControlContainer).control as FormGroup;
            this.selectedTournamentFC = container.controls[ngControl.name!] as FormControl;
        } else {
            this.selectedTournamentFC = new FormControl();
        }
    }

    writeValue() { }

    registerOnChange() { }

    registerOnTouched() { }

}
