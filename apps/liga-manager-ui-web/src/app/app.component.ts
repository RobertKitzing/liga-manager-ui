import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import {
    I18nService,
    LoadingIndicatorService,
    ThemeService,
} from '@liga-manager-ui/services';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DarkMode, DarkModeAppearance } from '@aparajita/capacitor-dark-mode';
import { MatSelectModule } from '@angular/material/select';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { ChangePasswordComponent, LoginComponent, NavLinksComponent } from '@liga-manager-ui/components';
import { SafeArea, SafeAreaInsets } from 'capacitor-plugin-safe-area';
import { Device } from '@capacitor/device';
import { dispatch, select, Store } from '@ngxs/store';
import { AppSettingsSelectors, AuthStateSelectors, Language, Logout, SelectedItemsSelectors, SetSelectedDarkMode, SetSelectedTheme } from '@liga-manager-ui/states';
import { APP_ROUTES } from '@liga-manager-ui/common';

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
        RouterLink,
    ],
})
export class AppComponent implements OnInit {

    APP_ROUTES = APP_ROUTES;

    themeService = inject(ThemeService);

    loadingIndicatorService = inject(LoadingIndicatorService);

    i18Service = inject(I18nService);

    private store = inject(Store);

    user$ = this.store.select(AuthStateSelectors.properties.user);

    logout = dispatch(Logout);

    private dialog = inject(MatDialog);

    private route = inject(ActivatedRoute);

    private router = inject(Router);

    private googleMapsApiKey = select(AppSettingsSelectors.googleMapsApiKey);

    DarkModeAppearance = DarkModeAppearance;

    darkModeControl = new FormControl(this.store.selectSnapshot(SelectedItemsSelectors.selectedDarkMode) || DarkModeAppearance.system);

    languageControl = new FormControl(this.i18Service.storedLang());

    themeControl = new FormControl(this.store.selectSnapshot(SelectedItemsSelectors.selectedTheme));

    safeAreaInsets = signal<SafeAreaInsets>({ insets: { top: 0, bottom: 0, left: 0, right: 0 }});

    private translateService = inject(TranslateService);

    get title$() {
        const url = this.router.url.split('/')[1].split('?')[0];
        return this.translateService.get(`NAVIGATION.${url.toUpperCase()}`);
    }

    async ngOnInit() {

        SafeArea.getSafeAreaInsets().then(async(safeAreaInsets) => {
            const info = await Device.getInfo();
            if (info.androidSDKVersion! >= 35) {
                this.safeAreaInsets.set(safeAreaInsets);
            }
        });

        this.route.queryParams.subscribe((params) => {
            if (params['theme']) {
                this.changeTheme(params['theme']);
            }
        });

        this.darkModeControl.valueChanges.subscribe((dark) => {
            this.store.dispatch(new SetSelectedDarkMode(dark));
            DarkMode.update();
        });

        this.languageControl.valueChanges.subscribe((lang) => {
            this.changeLang(lang!);
        });

        this.themeControl.valueChanges.subscribe((theme) => {
            this.changeTheme(theme || 'default');
        });

        this.loadGoogleMapsScript();
    }

    loadGoogleMapsScript() {
        const googleMapsJS = document.getElementById('googelmapsscript');
        if (!googleMapsJS && this.googleMapsApiKey()) {
            const tag = document.createElement('script');
            tag.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey()}&libraries=places&loading=async`;
            tag.type = 'text/javascript';
            tag.id = 'googelmapsscript';
            document.body.appendChild(tag);
        }
    }

    openLoginDialog() {
        this.dialog.open(LoginComponent);
    }

    openChangePasswordDialog() {
        this.dialog.open(ChangePasswordComponent);
    }

    changeTheme(theme: string) {
        this.store.dispatch(new SetSelectedTheme(theme));
    }

    changeLang(param: { code: string; direction?: string }) {
        this.i18Service.changeLang(param);
    }

    languageCompare(c1: Language, c2: Language) {
        return c1 && c2 && c1.code === c2.code;
    }

}
