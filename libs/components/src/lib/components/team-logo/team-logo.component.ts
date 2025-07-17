import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Team } from '@liga-manager-api/graphql';
import { Configuration } from '@liga-manager-api/openapi';

@Component({
    selector: 'lima-team-logo',
    imports: [
        NgOptimizedImage,
    ],
    templateUrl: './team-logo.component.html',
})
export class TeamLogoComponent {

    width = input<number | undefined>();

    height = input<number | undefined>();

    team = input<Team | null>();

    basePath = inject(Configuration).basePath;

}
