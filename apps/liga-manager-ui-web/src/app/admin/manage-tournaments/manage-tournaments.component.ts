import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment } from '@liga-manager-api/graphql';
import { TournamentChooserComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { fromStorage, TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { of, startWith, switchMap, tap } from 'rxjs';
import { CreateNewTournamentComponent } from './create-new-tournament';
import { StorageKeys } from '@liga-manager-ui/common';

@Component({
    selector: 'lima-manage-tournaments',
    templateUrl: './manage-tournaments.component.html',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        TranslateModule,
        AsyncPipe,
        CustomDatePipe,
        TournamentChooserComponent,
        CypressSelectorDirective,
    ],
})
export class ManageTournamentsComponent {

    manageTournament = fromStorage<AllTournamentsFragment>(StorageKeys.ADMIN_SELECTED_MANAGE_TOURNAMENT)

    selectedTournamentFC = new FormControl(this.manageTournament());

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        startWith(this.manageTournament()),
        tap((tournament) => {
            if (tournament) {
                this.manageTournament.set(tournament);
            }
        }),
        switchMap((tournament) =>
            tournament
                ? this.tournamentService.getTournamentById$(tournament?.id)
                : of(null),
        ),
    );

    constructor(
        public tournamentService: TournamentService,
        private dialog: MatDialog,
    ) {}

    createTournament() {
        this.dialog.open(CreateNewTournamentComponent);
    }

}
