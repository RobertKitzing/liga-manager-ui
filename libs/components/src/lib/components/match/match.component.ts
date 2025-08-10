import { AsyncPipe, NgClass } from '@angular/common';
import { Component, DestroyRef, inject, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Match, MatchDay, Team } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CustomDatePipe, NumberPipe } from '@liga-manager-ui/pipes';
import { AppsettingsService, AuthenticationService, UserService } from '@liga-manager-ui/services';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchResultComponent, defaultDialogConfig, EditMatchPitchComponent, ViewTeamContactComponent, CancelMatchComponent, EditMatchKickoffComponent } from '../../dialogs';
import { MatCardModule } from '@angular/material/card';
import { TeamLogoComponent } from '../team-logo/team-logo.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Share } from '@capacitor/share';
import { APP_ROUTES } from '@liga-manager-ui/common';

@Component({
    selector: 'lima-match',
    standalone: true,
    imports: [
        TranslateModule,
        CustomDatePipe,
        NgClass,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        NumberPipe,
        CypressSelectorDirective,
        MatCardModule,
        TeamLogoComponent,
        AsyncPipe,
    ],
    templateUrl: './match.component.html',
})
export class MatchComponent {

    canShare = Share.canShare();

    @Input({ required: true }) match!: Match;

    @Input() markLooser = false;

    matchDay = input<MatchDay | undefined>();

    resultOnly = input(false);

    authService = inject(AuthenticationService);

    private dialog = inject(MatDialog);

    private router = inject(Router);

    private userService = inject(UserService);

    private appsettingsService = inject(AppsettingsService)

    get dialogData() {
        return {
            match: this.match,
            matchDay: this.matchDay(),
        };
    }

    canEditMatch(match: Match) {
        if (this.router.url.includes('history')) {
            return false;
        }
        return this.userService.canEditMatch(match);
    }

    openEditResultDialog() {
        this.dialog.open(EditMatchResultComponent, {
            ...defaultDialogConfig,
            data: this.dialogData,
        });
    }

    openEditPitchDialog() {
        this.dialog.open(EditMatchPitchComponent, {
            ...defaultDialogConfig,
            data: this.dialogData,
        });
    }

    openViewContactDialog(team: Team) {
        this.dialog.open(ViewTeamContactComponent, {
            ...defaultDialogConfig,
            data: team,
        });
    }

    openCancelMatchDialog() {
        this.dialog.open(CancelMatchComponent, {
            ...defaultDialogConfig,
            data: this.dialogData,
        });
    }

    openEditKickoffDialog() {
        this.dialog.open(EditMatchKickoffComponent, {
            ...defaultDialogConfig,
            data: this.dialogData,
        });
    }

    isHomeWinner() {
        return (
            this.markLooser &&
            (this.match?.home_score || 0) > (this.match?.guest_score || 0)
        );
    }

    isGuestWinner() {
        return (
            this.markLooser &&
            (this.match?.home_score || 0) < (this.match?.guest_score || 0)
        );
    }

    async share() {
        const url = `${this.appsettingsService.host}/${APP_ROUTES.MATCH}/${this.match.id}`;
        await Share.share({
            url,
        });
    }

}
