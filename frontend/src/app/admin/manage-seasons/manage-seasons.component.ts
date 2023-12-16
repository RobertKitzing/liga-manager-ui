import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AllSeasonsFragment } from '@api/graphql';
import { SeasonChooserComponent } from '@lima/shared/components';

@Component({
    selector: 'lima-manage-seasons',
    templateUrl: './manage-seasons.component.html',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        SeasonChooserComponent,
    ],
})
export class ManageSeasonsComponent {

    selectedSeasonFC = new FormControl<AllSeasonsFragment>({} as AllSeasonsFragment);

}
