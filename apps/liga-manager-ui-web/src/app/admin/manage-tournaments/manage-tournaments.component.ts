import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllTournamentsFragment, TournamentState } from '@liga-manager-api/graphql';
import { TournamentChooserComponent, MatchComponent, EditTournamentRoundComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { fromStorage, TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, of, startWith, switchMap, tap } from 'rxjs';
import { CreateNewTournamentComponent } from './create-new-tournament';
import { StorageKeys } from '@liga-manager-ui/common';
import { MatCardModule } from '@angular/material/card';

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
        MatCardModule,
        MatchComponent,
        EditTournamentRoundComponent,
    ],
})
export class ManageTournamentsComponent {

    tournamentService = inject(TournamentService);

    private dialog = inject(MatDialog);

    TournamentState = TournamentState;

    manageTournament = fromStorage<AllTournamentsFragment>(StorageKeys.ADMIN_SELECTED_MANAGE_TOURNAMENT);

    selectedTournamentFC = new FormControl(this.manageTournament());

    editRound = signal<number | undefined>(undefined);

    createRoundMode = signal<number | undefined>(undefined);

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

    tournamentEnded(tournamentState: TournamentState) {
        return tournamentState === TournamentState.Ended;
    }

    createTournament() {
        this.dialog.open(CreateNewTournamentComponent);
    }

    createNext(round: number) {
        this.editRound.set(undefined);
        this.createRoundMode.set(round);
    }

    roundEdited() {
        this.editRound.set(undefined);
        this.createRoundMode.set(undefined);
    }

    startTournament(id: string) {
        firstValueFrom(this.tournamentService.startTournament(id));
    }

    endTournament(id: string) {
        firstValueFrom(this.tournamentService.endTournament(id));
    }

    deleteTournament(id: string) {
        firstValueFrom(this.tournamentService.deleteTournament(id));
        this.selectedTournamentFC.reset();
    }

}
