import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match, MatchDay } from '@liga-manager-api/graphql';
import { MatchService, NotificationService } from '@liga-manager-ui/services';
import { Store } from '@ngxs/store';

export interface EditMatchData { match: Match; matchDay: MatchDay }

@Component({
    template: '',
    styleUrls: [],
    standalone: true,
})
export class EditMatchBaseComponent {

    data = inject<EditMatchData>(MAT_DIALOG_DATA);

    protected notificationService = inject(NotificationService);

    protected matchService = inject(MatchService);

    protected store = inject(Store);

}
