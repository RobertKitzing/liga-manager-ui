import { NgOptimizedImage } from '@angular/common';
import { Component, inject, InjectionToken, input } from '@angular/core';
import { Team } from '@liga-manager-api/graphql';
import { Configuration } from '@liga-manager-api/openapi';

export const LOGO_PATH = new InjectionToken<string>('LOGO_PATH');

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

    logoPath = inject(LOGO_PATH);

    basePath = inject(Configuration).basePath;

}
