/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncPipe } from '@angular/common';
import { Component, forwardRef, inject, Injector, input, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Maybe, Team } from '@liga-manager-api/graphql';
import { TeamService } from '@liga-manager-ui/services';
import { TeamSelectors } from '@liga-manager-ui/states';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';

@Component({
    selector: 'lima-team-chooser',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        MatSelectModule,
        TranslateModule,
    ],
    templateUrl: './team-chooser.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TeamChooserComponent),
            multi: true,
        },
    ],
})
export class TeamChooserComponent implements OnInit, ControlValueAccessor {

    label = input<string | undefined>(undefined);

    selectedTeamFC!: FormControl<Team | Team[] | null>;

    @Input() teams!: Maybe<Team>[];

    multiple = input(false);

    private store = inject(Store);

    private injector = inject(Injector);

    teamService = inject(TeamService);

    allTeams$ = this.store.select(TeamSelectors.teams);

    ngOnInit(): void {
        const ngControl = this.injector.get(NgControl);

        if (ngControl instanceof FormControlName) {
            this.selectedTeamFC = this.injector.get(FormGroupDirective).getControl(ngControl);
        } else {
            this.selectedTeamFC = (ngControl as FormControlDirective).form;
        }

    }

    writeValue(_obj: any): void {
    }

    registerOnChange(_fn: any): void {
    }

    registerOnTouched(_fn: any): void {
    }

    setDisabledState?(_isDisabled: boolean): void {
    }

}
