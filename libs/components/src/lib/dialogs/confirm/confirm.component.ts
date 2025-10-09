
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        CypressSelectorDirective,
    ],
})
export class ConfirmComponent {

    data = inject<{ body: string, translateParams?: unknown }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<ConfirmComponent>);

}
