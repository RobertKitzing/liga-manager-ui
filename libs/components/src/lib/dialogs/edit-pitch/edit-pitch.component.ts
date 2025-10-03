import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { NotificationService, PitchService } from '@liga-manager-ui/services';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { firstValueFrom } from 'rxjs';
import { PitchComponent } from '../../components';
import { Pitch } from '@liga-manager-api/graphql';
import { select } from '@ngxs/store';
import { AppSettingsSelectors } from '@liga-manager-ui/states';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-edit-pitch',
    templateUrl: './edit-pitch.component.html',
    styleUrls: [],
    standalone: true,
    imports: [
        TranslateModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIcon,
        PitchComponent,
        CypressSelectorDirective,
    ],
})
export class EditPitchDialogComponent implements OnInit {

    private pitchService = inject(PitchService);

    private notificationService = inject(NotificationService);

    googleMapsApiKey = select(AppSettingsSelectors.googleMapsApiKey);

    data = inject<{ body: string }>(MAT_DIALOG_DATA);

    dialogRef = inject(MatDialogRef<EditPitchDialogComponent>);

    newpitchplace = new FormControl();

    formGroup = new FormGroup({
        id: new FormControl<string>(uuidv4(), { nonNullable: true }),
        label: new FormControl(null, [ Validators.required ]),
        location_longitude: new FormControl<number | undefined>(undefined, [ Validators.required ]),
        location_latitude: new FormControl<number | undefined>(undefined, [ Validators.required ]),
    });

    get newPitch() {
        return this.formGroup.value as unknown as Pitch;
    }

    adressAutoComplete = viewChild<ElementRef<HTMLDivElement>>('adressAutoComplete');

    ngOnInit(): void {
        // @ts-expect-error @types/google.maps not working
        const places = new google.maps.places.PlaceAutocompleteElement();
        this.adressAutoComplete()?.nativeElement.appendChild(places);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        places.addEventListener('gmp-select', async ({ placePrediction }: any) => {
            const place = placePrediction.toPlace();
            await place.fetchFields({
                fields: ['location'],
            });
            const t = place.toJSON();
            this.formGroup.controls.location_latitude.setValue(t.location.lat);
            this.formGroup.controls.location_longitude.setValue(t.location.lng);
        });
    }

    async onSaveClicked() {
        try {
            const newPitch = {
                id: this.formGroup.value.id!,
                label: this.formGroup.value.label!,
                location_longitude: this.formGroup.value.location_longitude!,
                location_latitude: this.formGroup.value.location_latitude!,
            };
            await firstValueFrom(this.pitchService.createPitch(newPitch));
            this.notificationService.showSuccessNotification(marker('SUCCESS.SAVE'));
            this.dialogRef.close(newPitch);
        } catch(error) {
            console.error(error);
        }
    }

}
