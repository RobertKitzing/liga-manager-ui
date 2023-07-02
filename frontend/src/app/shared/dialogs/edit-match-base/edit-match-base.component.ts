import { Component, Input, TemplateRef } from '@angular/core';
import { Match, MatchDay } from 'src/api/graphql';

@Component({
    selector: 'lima-edit-match-base',
    templateUrl: './edit-match-base.component.html',
    styleUrls: [],
})
export class EditMatchBaseComponent {
    @Input() data!: { match: Match; matchDay: MatchDay };

    @Input() actionsTemplate!: TemplateRef<unknown>;
}
