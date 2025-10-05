import { Component, DestroyRef, inject, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Season, SeasonState } from '@liga-manager-api/graphql';
import { SeasonService, TeamService } from '@liga-manager-ui/services';
import { Store } from '@ngxs/store';

@Component({template: ''})
export class ManageSeasonBaseComponent {

    SeasonState = SeasonState;

    seasonService = inject(SeasonService);

    teamService = inject(TeamService);

    dialog = inject(MatDialog);

    router = inject(Router);

    destroyRef = inject(DestroyRef);

    protected store = inject(Store);

    @Input({required: true}) season: Season | null | undefined;

}
