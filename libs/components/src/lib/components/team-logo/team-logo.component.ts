import { NgOptimizedImage } from '@angular/common';
import { Component, inject, InjectionToken, input } from '@angular/core';
import { Team } from '@liga-manager-api/graphql';
import { Configuration } from '@liga-manager-api/openapi';

export const LOGO_URL = new InjectionToken<string>('LOGO_URL');

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

    logoUrl = inject(LOGO_URL);

    basePath = inject(Configuration).basePath;

}
