import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
    AuthenticationService,
    I18nService,
    LoadingIndicatorService,
    ThemeService,
} from '@lima/shared/services';
import { LoginComponent } from './shared/dialogs';

@Component({
    selector: 'lima-root',
    templateUrl: './app.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    darkModeControl = new FormControl(this.themeService.darkMode$.getValue(), {
        nonNullable: true,
    });

    constructor(
        public themeService: ThemeService,
        public loadingIndicatorService: LoadingIndicatorService,
        public authService: AuthenticationService,
        public i18Service: I18nService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
    ) {}

    get currentRoute() {
        const url = this.router.url.split('/')[1];
        return `NAVIGATION.${url.toUpperCase()}`;
    }

    async ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            if (params['theme']) {
                this.changeTheme(params['theme']);
            }
        });

        this.darkModeControl.valueChanges.subscribe((dark) => {
            this.themeService.darkMode$.next(dark);
        });
    }

    openLoginDialog() {
        this.dialog.open(LoginComponent);
    }

    openChangePasswordDialog() {
        // TODO: Add
    }

    changeTheme(theme: string) {
        this.themeService.currentTheme$.next(theme);
    }

    changeLang(param: { code: string; direction?: string }) {
        this.i18Service.changeLang(param);
    }

    onSwipeLeft() {
        this.location.back();
    }

    onSwipeRight() {
        this.location.forward();
    }

}
