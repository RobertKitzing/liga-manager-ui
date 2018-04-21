import { Subscription } from 'rxjs/Subscription';
import { MatchService } from './../../service/match.service';
import { Logger } from './../../core/logger.service';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Subject } from 'rxjs/Subject';
import { AuthenticationService } from '@app/service/authentication.service';
import { MatDialog } from '@angular/material';
import { EditMatchDialogComponent } from '@app/shared/editmatch/editmatch.dialog.component';
import { I18nService } from '@app/core/i18n.service';
import { TeamService } from '@app/service/team.service';
import { Match, Pitch, Client, Team, Contact_person } from '@app/api/openapi';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WebsocketService } from '@app/service/websocket.service';
import { ContactDialogComponent, ContactPersonViewModel } from '@app/shared/contact/contact.dialog.component';

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
    homeTeam: Team;
    guestTeam: Team;

    get canEditMatch(): boolean {
        return this.authService.isAdminUser ||
            this.authService.isUserInTeam(this.match.home_team_id) ||
            this.authService.isUserInTeam(this.match.guest_team_id);
    }

    constructor(
        public teamService: TeamService,
        public i18Service: I18nService,
        public dialog: MatDialog,
        public authService: AuthenticationService,
        private matchService: MatchService
    ) {
    }

    ngOnInit() {
        this.wsSubscription = this.matchService.matchId.subscribe(
            (res) => {
                if (res === this.match.id) {
                    this.updateMatch();
                }
            }
        );
        this.homeTeam = this.teamService.getTeamByID(this.match.home_team_id);
        this.guestTeam = this.teamService.getTeamByID(this.match.guest_team_id);
        log.debug(this.homeTeam);
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

    openContactModal() {
        const contacts = new Array<ContactPersonViewModel>();
        const home: ContactPersonViewModel = {
            title: this.teamService.getTeamNameByID(this.homeTeam.id),
            contact: this.homeTeam.contact
        };
        const guest: ContactPersonViewModel = {
            title: this.teamService.getTeamNameByID(this.guestTeam.id),
            contact: this.guestTeam.contact
        };
        contacts.push(home);
        contacts.push(guest);
        this.dialog.open(ContactDialogComponent, {data: contacts} );
    }

    async updateMatch() {
        this.match = await this.matchService.getMatch(this.match.id);
    }
}
