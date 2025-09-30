import { Component, effect, inject, input } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { Team } from '@liga-manager-api/graphql';
import { TrimDirective } from '@liga-manager-ui/directives';
import { NotificationService, TeamService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule,
        MatCardModule,
        TrimDirective,
    ],
    templateUrl: './edit-team-contact.component.html',
})
export class EditTeamContactComponent {

    activatedRoute = inject(ActivatedRoute);

    teamService = inject(TeamService);

    notificationService = inject(NotificationService);

    team = input<Team>();

    teamContact = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
    });

    constructor() {
        effect(
            () => {
                console.log(this.team());
                if (this.team()?.contact) {
                    this.teamContact.patchValue(
                        {
                            email: this.team()?.contact?.email,
                            first_name: this.team()?.contact?.first_name,
                            last_name: this.team()?.contact?.last_name,
                            phone: this.team()?.contact?.phone,
                        },
                    );
                }
            },
        );
    }

    async updateTeamContact() {
        console.log(this.team());
        try {
            await firstValueFrom(
                this.teamService.updateTeamContact({
                    team_id: this.team()?.id || '',
                    email: this.teamContact.value.email!,
                    first_name: this.teamContact.value.first_name!,
                    last_name: this.teamContact.value.last_name!,
                    phone: this.teamContact.value.phone!,
                }),
            );
            this.notificationService.showSuccessNotification(
                marker('TEAM_CONTACT_SAVED_SUCCESS'),
            );
        } catch (_error) {
            //Empty Catch
        }
    }

}
