import { NgOptimizedImage } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
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

    width = input<number>(0);

    height = input<number>(0);

    team = input<Team | null>();

    basePath = inject(Configuration).basePath;

    error = signal(false);

    onError(error: any) {
        this.error.set(true);
    }

}
