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
import { NotificationService } from '@liga-manager-ui/services';
import { CreateTournament } from '@liga-manager-ui/states';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
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

    private store = inject(Store);

    private dialog = inject(MatDialog);

    private notificationService = inject(NotificationService);

    newName = new FormControl('', { validators: [ Validators.required ], nonNullable: true });

    async createTournament() {
        try {
            await firstValueFrom(
                this.store.dispatch(new CreateTournament({ name: this.newName.value })),
            );
            this.notificationService.showSuccessNotification(
                marker('SUCCESS.CREATE_TOURNAMENT'),
            );
            this.dialog.closeAll();
        } catch (_error) {
            this.notificationService.showErrorNotification(
                marker('CREATE_TOURNAMENT_ERROR'),
            );
        }
    }

}
