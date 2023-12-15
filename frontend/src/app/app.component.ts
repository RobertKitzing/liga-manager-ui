import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location, NgClass, AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    AuthenticationService,
    I18nService,
    LoadingIndicatorService,
    ThemeService,
} from '@lima/shared/services';
import { LoginComponent } from './shared/dialogs';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { NavLinksComponent } from './shared/components/nav-links/nav-links.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { defaultDialogConfig } from './app.config';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'lima-root',
    templateUrl: './app.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatToolbarModule,
        NavLinksComponent,
        MatButtonModule,
        TranslateModule,
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatProgressBarModule,
        RouterOutlet,
        MatListModule,
        NgClass,
        AsyncPipe,
    ],
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
        this.dialog.open(LoginComponent, defaultDialogConfig);
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
