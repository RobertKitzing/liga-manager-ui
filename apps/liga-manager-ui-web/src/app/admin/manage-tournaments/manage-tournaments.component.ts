import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TournamentState } from '@liga-manager-api/graphql';
import { TournamentChooserComponent, MatchComponent, EditTournamentRoundComponent } from '@liga-manager-ui/components';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CustomDatePipe } from '@liga-manager-ui/pipes';
import { TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, of, switchMap, tap } from 'rxjs';
import { CreateNewTournamentComponent } from './create-new-tournament';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngxs/store';
import { SelectedItemsSelectors, SetSelectedTournament } from '@liga-manager-ui/states';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class ManageTournamentsComponent implements OnInit {


    tournamentService = inject(TournamentService);

    private dialog = inject(MatDialog);

    private store = inject(Store);

    private destroyRef = inject(DestroyRef);

    TournamentState = TournamentState;

    selectedTournamentFC = new FormControl<string | undefined>('');

    editRound = signal<number | undefined>(undefined);

    createRoundMode = signal<number | undefined>(undefined);

    selectedTournament$ = this.store.select(SelectedItemsSelectors.selectedTournamentId('administration')).pipe(
        tap((tournamentId) => {
            if (tournamentId) {
                this.selectedTournamentFC.setValue(tournamentId, { emitEvent: false });
            }
        }),
        switchMap((tournamentId) =>
            tournamentId
                ? this.tournamentService.getTournamentById$(tournamentId)
                : of(null),
        ),
    );

    ngOnInit(): void {
        this.selectedTournamentFC.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((id) => this.store.dispatch(new SetSelectedTournament('administration', id)));
    }

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
