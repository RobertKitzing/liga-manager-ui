import { AsyncPipe, Location } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthStateSelectors, GetAuthenticatedUser, Logout, SetToken } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { NotificationService, UserService } from '@liga-manager-ui/services';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatIconModule } from '@angular/material/icon';
import { APP_ROUTES } from '@liga-manager-ui/common';

@Component({
    selector: 'lima-new-password',
    templateUrl: './new-password.component.html',
    imports: [
        AsyncPipe,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        CypressSelectorDirective,
        MatIconModule,
    ],
})
export class NewPasswordComponent {

    private userService = inject(UserService);

    private store = inject(Store);

    private notificationService = inject(NotificationService);

    private translateService =  inject(TranslateService);

    private router = inject(Router);

    private location = inject(Location);

    token = input<string>();

    user$ = this.store.select(AuthStateSelectors.properties.user);

    passwordForm = new FormGroup({
        password: new FormControl(null, [ Validators.required, Validators.minLength(6)]),
    });

    constructor() {
        effect(
            async () => {
                if (this.token()) {
                    await firstValueFrom(this.store.dispatch(new SetToken(this.token())));
                    await firstValueFrom(this.store.dispatch(new GetAuthenticatedUser(true)));
                    this.location.replaceState(APP_ROUTES.NEW_PASSWORD);
                }
            },
        );
    }

    async changePassword() {
        if (this.passwordForm.controls.password.value) {
            try {
                await firstValueFrom(this.userService.setPassword(this.passwordForm.controls.password.value));
                this.store.dispatch(new Logout());
                this.notificationService.showSuccessNotification(this.translateService.instant('SUCCESS.PASSWORD_CHANGED'));
                this.router.navigate(['']);
            } catch (error) {
                console.error(error);
            }
        }
    }

}