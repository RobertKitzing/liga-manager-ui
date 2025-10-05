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
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
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

    private dialogRef = inject(MatDialogRef<CreateNewTournamentComponent>);

    newName = new FormControl('', { validators: [ Validators.required ], nonNullable: true });

    async createTournament() {
        try {
            await firstValueFrom(
                this.store.dispatch(new CreateTournament({ name: this.newName.value })),
            );
            this.dialogRef.close();
        } catch (_error) {
            console.error(_error);
        }
    }

}
