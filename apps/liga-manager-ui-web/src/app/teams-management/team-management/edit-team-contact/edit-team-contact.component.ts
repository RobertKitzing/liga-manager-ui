import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { NotificationService, TeamService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { firstValueFrom, map, switchMap, tap } from 'rxjs';

@Component({
    selector: 'lima-team-contact',
    standalone: true,
    imports: [
        AsyncPipe,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule,
    ],
    templateUrl: './edit-team-contact.component.html',
})
export class EditTeamContactComponent {

    team$ = this.activatedRoute.parent?.paramMap.pipe(
        map((p) => p.get('teamId')!),
        switchMap((teamId) =>
            this.teamService.getTeamById(teamId).pipe(
                tap((team) => {
                    this.teamContact.patchValue({
                        email: team?.contact?.email,
                        first_name: team?.contact?.first_name,
                        last_name: team?.contact?.last_name,
                        phone: team?.contact?.phone,
                    });
                }),
            ),
        ),
    );

    teamContact = new FormGroup({
        email: new FormControl('', [Validators.email]),
        first_name: new FormControl('', [Validators.required]),
        last_name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
    });

    constructor(
        private activatedRoute: ActivatedRoute,
        private teamService: TeamService,
        private notificationService: NotificationService,
    ) {}

    async updateTeamContact(team_id: string) {
        try {
            await firstValueFrom(
                this.teamService.updateTeamContact({
                    team_id,
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
            this.notificationService.showErrorNotification(
                marker('TEAM_CONTACT_SAVED_ERROR'),
            );
        }
    }

}
