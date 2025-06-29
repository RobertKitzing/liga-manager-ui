import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Match, MatchDay } from '@liga-manager-api/graphql';

@Component({
    selector: 'lima-edit-match-base',
    templateUrl: './edit-match-base.component.html',
    styleUrls: [],
    standalone: true,
    imports: [TranslateModule, CommonModule, MatDialogModule],
})
export class EditMatchBaseComponent {
    @Input() data!: { match: Match; matchDay: MatchDay };

    @Input() actionsTemplate!: TemplateRef<unknown>;
}
