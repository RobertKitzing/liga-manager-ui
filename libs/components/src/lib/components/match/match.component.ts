import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Match, MatchDay, Team } from '@liga-manager-api/graphql';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { CustomDatePipe, NumberPipe } from '@liga-manager-ui/pipes';
import { TranslateModule } from '@ngx-translate/core';
import { EditMatchResultComponent, defaultDialogConfig, EditMatchPitchComponent, ViewTeamContactComponent, CancelMatchComponent, EditMatchKickoffComponent } from '../../dialogs';
import { MatCardModule } from '@angular/material/card';
import { TeamLogoComponent } from '../team-logo/team-logo.component';
import { Share } from '@capacitor/share';
import { PitchComponent } from '../pitch/pitch.component';
import { DateTimeComponent } from '../date-time/date-time.component';
import { Store } from '@ngxs/store';
import { AuthStateSelectors } from '@liga-manager-ui/states';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ShareService } from '@liga-manager-ui/services';

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
        PitchComponent,
        DateTimeComponent,
    ],
    templateUrl: './match.component.html',
})
export class MatchComponent {

    private store = inject(Store);

    private shareService = inject(ShareService);

    match = input.required<Match>();

    markLooser = input(false);

    canEditMatch$ = toObservable(this.match).pipe(
        switchMap(
            (match) => this.store.select(AuthStateSelectors.canEditMatch(match)),
        ),
    );

    canShare = Share.canShare();

    matchDay = input<MatchDay | undefined>();

    resultOnly = input(false);

    readOnly = input(false);

    private dialog = inject(MatDialog);

    user$ = this.store.select(AuthStateSelectors.properties.user);

    get dialogData() {
        return {
            match: this.match(),
            matchDay: this.matchDay(),
        };
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
            // width: '50vw',
            // height: '50vh',
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
            this.markLooser() &&
            (this.match()?.home_score || 0) > (this.match()?.guest_score || 0)
        );
    }

    isGuestWinner() {
        return (
            this.markLooser() &&
            (this.match()?.home_score || 0) < (this.match()?.guest_score || 0)
        );
    }

    share() {
        this.shareService.shareMatch(this.match().id);
    }

}
