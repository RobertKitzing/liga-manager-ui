import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AllTournamentsFragment, Tournament } from '@liga-manager-api/graphql';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewTournamentComponent } from './create-new-tournament';
import { TournamentService } from '@liga-manager-ui/services';
import { AsyncPipe } from '@angular/common';
import { of, startWith, switchMap, tap } from 'rxjs';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { LocalStorage } from 'ngx-webstorage';
import { TournamentChooserComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

const SELECTED_MANAGE_TOURNAMENT_KEY = 'SELECTED_MANAGE_TOURNAMENT';
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

    @LocalStorage(SELECTED_MANAGE_TOURNAMENT_KEY) manageTournament!: AllTournamentsFragment;

    selectedTournamentFC = new FormControl<Tournament | null>(
        this.manageTournament,
    );

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        startWith(this.manageTournament),
        tap((tournament) => {
            if (tournament) {
                this.manageTournament = tournament;
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
