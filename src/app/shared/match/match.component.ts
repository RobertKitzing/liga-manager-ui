import { Subscription } from 'rxjs/Subscription';
import { MatchService } from './../../service/match.service';
import { Logger } from './../../core/logger.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { EditMatchDialogComponent } from '@app/shared/editmatch/editmatch.dialog.component';
import { I18nService } from '@app/core/i18n.service';
import { TeamService } from '@app/service/team.service';
import { Match, Pitch, Client } from '@app/api/openapi';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '@app/service/websocket.service';

const log = new Logger('MatchComponent');
@Component({
    selector: 'app-match',
    templateUrl: 'match.component.html',
    styleUrls: ['match.component.scss']
})

export class MatchComponent implements OnInit {

    @Input() match: Match;
    @Input() pitches: Pitch[];
    @Output() pitchAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

    wsSubscription: Subscription;

    constructor(
        private apiClient: Client,
        public teamService: TeamService,
        public i18Service: I18nService,
        public dialog: MatDialog,
        public authService: AuthenticationService,
        private matchService: MatchService
    ) {
     }

    ngOnInit() {
        log.debug(this.match.id);
        this.wsSubscription = this.matchService.matchId.subscribe(
            (res) => {
                if (res === this.match.id) {
                    this.updateMatch();
                }
            }
        );
        log.debug(this.wsSubscription);
     }

    getPitch(pitchId: string): Pitch {
        return this.pitches.find(p => p.id === pitchId) || new Pitch();
    }

    openEditDialog(matchId: string) {
        const dialogRef = this.dialog.open(EditMatchDialogComponent, {
            data: { matchId: matchId }
        });

        dialogRef.afterClosed().subscribe(
            (result) => {
                if (result) {
                    this.updateMatch();
                    this.pitchAdded.emit(true);
                    this.matchService.updateMatch(matchId);
                }
            });
    }

    updateMatch() {
        log.debug('updateMatch');
        this.apiClient.getMatch(this.match.id).subscribe(
            (match) => {
                this.match = match;
            }
        );
    }
}
