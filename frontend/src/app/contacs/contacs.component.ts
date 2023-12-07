import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SeasonChooserComponent, TeamContactComponent } from '@lima/shared/components';
import { SeasonService, TeamService } from '@lima/shared/services';
import { TranslateModule } from '@ngx-translate/core';
import { map, startWith, switchMap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'lima-contacs',
    templateUrl: './contacs.component.html',
    standalone: true,
    imports: [
        AsyncPipe,
        JsonPipe,
        TeamContactComponent,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateModule,
        MatCheckboxModule,
        FormsModule,
        SeasonChooserComponent,
        MatToolbarModule,
    ],
})
export class ContacsComponent {

    searchTeam = new FormControl();

    teams$ = this.searchTeam.valueChanges.pipe(
        startWith(null),
        switchMap((searchTerm) =>
            !searchTerm
                ? this.teamService.allTeams$
                : this.teamService.allTeams$.pipe(
                      map((x) =>
                          x?.filter((y) =>
                              y?.name
                                  .toLocaleLowerCase()
                                  .includes(searchTerm.toLocaleLowerCase()),
                          ),
                      ),
                  ),
        ),
    );

    onlyCurrentSeason = false;

    constructor(
        private teamService: TeamService,
        private seasonService: SeasonService,
    ) {

    }

}
