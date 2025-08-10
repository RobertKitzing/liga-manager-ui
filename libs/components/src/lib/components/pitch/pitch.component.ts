import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Pitch } from '@liga-manager-api/graphql';

@Component({
    selector: 'lima-pitch',
    templateUrl: './pitch.component.html',
    standalone: true,
    imports: [
        TranslateModule,
    ],
})
export class PitchComponent {

    pitch = input<Pick<Pitch, 'id' | 'label' | 'location_latitude' | 'location_longitude'>>();

}
