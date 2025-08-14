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

    width = input<number>(0);

    height = input<number>(0);

    team = input<Team | null>();

    basePath = inject(Configuration).basePath;

    placeholder = 'data:image/webp;base64,UklGRpIAAABXRUJQVlA4WAoAAAAQAAAACQAACQAAQUxQSDgAAAABYBRJkqKSsuRgX+TfB0hYAXDX4yEiFAQEgIgzACGjxrWbkNY5L/NXx39LxU0LfsgNvnTJDC4DAFZQOCA0AAAA8AEAnQEqCgAKAAcAkiWwAnQBC2NATk0gAPxh+MwD1MPZrg5VVOUUv72vn8dnddXiffeQAA==';

}
