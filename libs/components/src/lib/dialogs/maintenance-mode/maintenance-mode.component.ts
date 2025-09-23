import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'lima-maintenance-mode',
    standalone: true,
    imports: [MatDialogModule, MatIconModule, TranslateModule, MatButtonModule],
    templateUrl: './maintenance-mode.component.html',
})
export class MaintenanceModeComponent {

    reload() {
        window.location.reload();
    }

}
