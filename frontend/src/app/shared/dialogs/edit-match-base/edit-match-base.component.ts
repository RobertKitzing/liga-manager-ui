import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDateModule } from '@lima/shared/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { Match, MatchDay } from 'src/api/graphql';

@Component({
    selector: 'lima-edit-match-base',
    templateUrl: './edit-match-base.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        CustomDateModule,
        CommonModule,
        MatDialogModule,
    ],
})
export class EditMatchBaseComponent {

    @Input() data!: { match: Match; matchDay: MatchDay };

    @Input() actionsTemplate!: TemplateRef<unknown>;

}
