import { Component, DestroyRef, effect, inject, input, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService, TeamService, TournamentService } from '@liga-manager-ui/services';
import { AsyncPipe } from '@angular/common';
import { ApiDate, Match, MatchDay, Maybe, Team } from '@liga-manager-api/graphql';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatchComponent } from '../match';
import { TeamAutoCompleteComponent } from '../team-auto-complete/team-auto-complete.component';
import { firstValueFrom } from 'rxjs';
import { CypressSelectorDirective } from '@liga-manager-ui/directives';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

function typeofTeamValidator(): ValidatorFn {
    return (control) => {
        return typeof control.value == 'string' ? { noTeam: true }: null;
    };
}

@Component({
    selector: 'lima-edit-tournament-round',
    standalone: true,
    imports: [
        AsyncPipe,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule,
        MatchComponent,
        TeamAutoCompleteComponent,
        CypressSelectorDirective,
        MatDatepickerModule,
        MatInputModule,
    ],
    templateUrl: './edit-tournament-round.component.html',
})
export class EditTournamentRoundComponent {

    round = input<MatchDay | undefined>(undefined);

    tournamentId = input.required<string>();

    createNext = input(false);

    roundEdited = output<boolean>();

    teamService = inject(TeamService);

    filteredHomeTeams = signal<Maybe<Team>[] | undefined | null>([]);

    filteredGuestTeams = signal<Maybe<Team>[] | undefined | null>([]);

    private tournamentService = inject(TournamentService);

    private notificationService = inject(NotificationService);

    private translateService  = inject(TranslateService);

    newMatch = new FormGroup(
        {
            home: new FormControl<Team | undefined | null>(undefined, [ Validators.required, typeofTeamValidator() ]),
            guest: new FormControl<Team | undefined | null>(undefined, [ Validators.required, typeofTeamValidator() ]),
        },
    );

    roundDates = new FormGroup({
        from: new FormControl<Date | undefined>(undefined, [ Validators.required ]),
        to: new FormControl<Date | undefined>(undefined, [ Validators.required ]),
    });

    matches = signal<Maybe<Match>[]>([]);

    destroyRef = inject(DestroyRef);

    constructor() {
        effect(() => {
            if (!this.createNext()) {
                this.matches.set(this.round()?.matches || []);
            }
            if (this.round() && !this.createNext()) {
                this.roundDates.setValue({
                    from: new Date(this.round()?.start_date || ''),
                    to: new Date(this.round()?.end_date || ''),
                });
            }
        });
    }

    async saveRound() {
        try {
            let round = this.round()?.number || 0;
            if (this.createNext()) {
                round = (this.round()?.number || 0) + 1;
            }
            if (!this.roundDates.controls.from.value || !this.roundDates.controls.to.value) {
                return;
            }
            await firstValueFrom(
                this.tournamentService.createRound({
                    tournament_id: this.tournamentId(),
                    date_period: {
                        from: new ApiDate(this.roundDates.controls.from.value),
                        to: new ApiDate(this.roundDates.controls.to.value),
                    },
                    round,
                    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                    team_id_pairs: this.matches().map((t) => ({ home_team_id: t?.home_team.id!, guest_team_id: t?.guest_team.id! })),
                }),
            );
            this.notificationService.showSuccessNotification(this.translateService.instant('CREATE_TOURNAMENT_ROUND_SUCCESS'));
            this.roundEdited.emit(true);
        } catch (_error) {
            console.error(_error);
        }
    }

    addMatch() {
        const matches = [...this.matches()];
        matches.push({
            home_team: this.newMatch.controls.home.value!,
            guest_team: this.newMatch.controls.guest.value!,
            id: '',
        });
        this.matches.set(matches);
        this.newMatch.reset();
    }

    deleteMatch(match: Match) {
        const matches = [...this.matches()];
        this.matches.set(matches.filter((m) => m?.id !== match.id));
    }

}
