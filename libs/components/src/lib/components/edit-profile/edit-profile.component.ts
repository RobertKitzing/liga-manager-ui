import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthStateSelectors, GetAuthenticatedUser, SetToken } from '@liga-manager-ui/states';
import { select, Store } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationService, UserService } from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { APP_ROUTES } from '@liga-manager-ui/common';
import { Router } from '@angular/router';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';

@Component({
    selector: 'lima-edit-profile',
    templateUrl: './edit-profile.component.html',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatInputModule,
        TranslateModule,
        MatButtonModule,
        MatIconModule,
        CypressSelectorDirective,
        FormsModule,
    ],
})
export class EditProfileComponent {

    private router = inject(Router);

    private location = inject(Location);

    private store = inject(Store);

    private userService = inject(UserService);

    private notificationService = inject(NotificationService);

    token = input<string>();

    register = input(false);

    user = select(AuthStateSelectors.properties.user);

    userFormGroup = new FormGroup({
        email: new FormControl(this.user()?.email, [Validators.required, Validators.email]),
        first_name: new FormControl(this.user()?.first_name),
        last_name: new FormControl(this.user()?.last_name),
    });

    passwordFC = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor() {
        effect(
            async () => {
                if (this.token()) {
                    await firstValueFrom(this.store.dispatch(new SetToken(this.token())));
                    await firstValueFrom(this.store.dispatch(new GetAuthenticatedUser(true)));
                    this.userFormGroup.patchValue({
                        email: this.user()?.email,
                        first_name: this.user()?.first_name,
                        last_name: this.user()?.last_name,
                    }, { emitEvent: false });
                    this.location.replaceState(APP_ROUTES.REGISTER);
                }
            },
        );
    }

    async onSaveClicked() {
        try {
            await firstValueFrom(this.userService.updateUser({
                user_id: this.user()?.id || '',
                ...this.userFormGroup.value,
            }, this.user()?.role ));
            this.store.dispatch(new GetAuthenticatedUser(true));
            this.notificationService.showSuccessNotification(marker('SUCCESS.SAVE'));
            if (this.register()) {
                await firstValueFrom(this.userService.setPassword(this.passwordFC.value!));
                this.router.navigate(['']);
            }
        } catch(error) {
            console.error(error);
        }
    }

}
