import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Season, SeasonState } from '@liga-manager-api/graphql';
import { SeasonService } from '../../shared/services/season.service';
import { TeamService } from '../../shared/services/team.service';

@Component({template: ''})
export class ManageSeasonBaseComponent {

    SeasonState = SeasonState;

    activatedRoute = inject(ActivatedRoute);

    seasonService = inject(SeasonService);

    teamService = inject(TeamService);

    router = inject(Router);

    @Input({required: true}) season: Season | null | undefined;

}
