import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Location, AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
    AuthenticationService,
    I18nService,
    LoadingIndicatorService,
    StoredLang,
    ThemeService,
} from '@liga-manager-ui/services';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DarkMode, DarkModeAppearance } from '@aparajita/capacitor-dark-mode';
import { MatSelectModule } from '@angular/material/select';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { defaultDialogConfig, LoginComponent, NavLinksComponent } from '@liga-manager-ui/components';
import { SafeArea, SafeAreaInsets } from 'capacitor-plugin-safe-area';
import { Device } from '@capacitor/device';

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
        MatSelectModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatProgressBarModule,
        RouterOutlet,
        MatListModule,
        AsyncPipe,
        CypressSelectorDirective,
        NgOptimizedImage,
    ],
})
export class AppComponent implements OnInit {

    DarkModeAppearance = DarkModeAppearance;

    darkModeControl = new FormControl(this.themeService.darkMode());

    languageControl = new FormControl(this.i18Service.storedLang());

    themeControl = new FormControl(this.themeService.currentTheme$.getValue());

    safeAreaInsets = signal<SafeAreaInsets>({ insets: { top: 0, bottom: 0, left: 0, right: 0 }});

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

        SafeArea.getSafeAreaInsets().then(async(safeAreaInsets) => {
            const info = await Device.getInfo();
            if (info.androidSDKVersion! >= 35) {
                this.safeAreaInsets.set(safeAreaInsets)
            }
        });

        this.route.queryParams.subscribe((params) => {
            if (params['theme']) {
                this.changeTheme(params['theme']);
            }
        });

        this.darkModeControl.valueChanges.subscribe((dark) => {
            this.themeService.darkMode.set(dark || DarkModeAppearance.system);
            DarkMode.update();
        });

        this.languageControl.valueChanges.subscribe((lang) => {
            this.changeLang(lang!);
        });

        this.themeControl.valueChanges.subscribe((theme) => {
            this.changeTheme(theme || 'default');
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

    languageCompare(c1: StoredLang, c2: StoredLang) {
        return c1 && c2 && c1.code === c2.code;
    }

}
