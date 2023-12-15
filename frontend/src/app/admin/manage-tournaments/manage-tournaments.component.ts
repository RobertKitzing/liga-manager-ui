import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { AllTournamentListGQL, CreateTournamentGQL, Tournament } from '@api/graphql';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewTournamentComponent } from './create-new-tournament/create-new-tournament.component';
import { TournamentService } from '@lima/shared/services';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { CustomDateModule } from '@lima/shared/pipes';

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
        JsonPipe,
        CustomDateModule,
    ],
})
export class ManageTournamentsComponent {

    selectedTournamentFC = new FormControl();

    selectedTournament$ = this.selectedTournamentFC.valueChanges.pipe(
        switchMap(
            (tournament: Tournament) => this.tournamentService.getTournamentById(tournament.id),
        ),
    );

    constructor(
        public tournamentService: TournamentService,
        private dialog: MatDialog,
    ) {

    }

    createTournament() {
        this.dialog.open(CreateNewTournamentComponent)
    }

}
