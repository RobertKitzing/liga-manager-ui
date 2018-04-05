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

    constructor(
        private apiClient: Client,
        public teamService: TeamService,
        public i18Service: I18nService,
        public dialog: MatDialog,
        public authService: AuthenticationService,
        private matchService: MatchService,
        media: ObservableMedia
    ) {
        media.asObservable()
        .subscribe((change: MediaChange) => {
            log.debug(change);
        });
        this.matchService.messages.subscribe(
            (res) => {
                log.debug(res);
            }
        );
     }

    ngOnInit() { }

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
                }
            });
    }

    updateMatch() {
        this.apiClient.getMatch(this.match.id).subscribe(
            (match) => {
                this.match = match;
            }
        );
    }
}
