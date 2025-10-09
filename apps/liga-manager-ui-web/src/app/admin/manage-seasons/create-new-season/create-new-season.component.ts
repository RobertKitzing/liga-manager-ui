import { Component, inject } from '@angular/core';
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CreateSeason } from '@liga-manager-ui/states';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-create-new-season',
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
    templateUrl: './create-new-season.component.html',
})
export class CreateNewSeasonComponent {

    private store = inject(Store);

    dialogRef = inject(MatDialogRef<CreateNewSeasonComponent>);

    newName = new FormControl('', [Validators.required]);

    async createSeason() {
        await firstValueFrom(
            this.store.dispatch(new CreateSeason({ name: this.newName.value! })),
        );
        this.dialogRef.close();
    }

}
