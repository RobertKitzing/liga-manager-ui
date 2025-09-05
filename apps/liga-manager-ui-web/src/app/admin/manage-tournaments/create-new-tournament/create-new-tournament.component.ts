import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialog,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { NotificationService, TournamentService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-create-new-tournament',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        TranslateModule,
        CypressSelectorDirective,
    ],
    templateUrl: './create-new-tournament.component.html',
})
export class CreateNewTournamentComponent {

    private tournamentService = inject(TournamentService);

    private dialog = inject(MatDialog);

    private notificationService = inject(NotificationService);

    newName = new FormControl('', [Validators.required]);

    async createTournament() {
        try {
            await firstValueFrom(
                this.tournamentService.createTournament(this.newName.value!),
            );
            this.notificationService.showSuccessNotification(
                marker('CREATE_TOURNAMENT_SUCCESS'),
                [],
                'snackbar-success-create-tournament',
            );
            this.dialog.closeAll();
        } catch (_error) {
            this.notificationService.showErrorNotification(
                marker('CREATE_TOURNAMENT_ERROR'),
            );
        }
    }

}
