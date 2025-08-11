import { Component, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Season, SeasonState } from '@liga-manager-api/graphql';
import { SeasonService, TeamService } from '@liga-manager-ui/services';

@Component({template: ''})
export class ManageSeasonBaseComponent {

    SeasonState = SeasonState;

    seasonService = inject(SeasonService);

    teamService = inject(TeamService);

    dialog = inject(MatDialog);

    router = inject(Router);

    @Input({required: true}) season: Season | null | undefined;

}
