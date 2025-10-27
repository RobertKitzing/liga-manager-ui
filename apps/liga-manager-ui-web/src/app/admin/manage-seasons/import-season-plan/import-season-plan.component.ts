/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { PitchSelectors, TeamSelectors } from '@liga-manager-ui/states';
import { MatchComponent, PitchAutoCompleteComponent, TeamAutoCompleteComponent } from '@liga-manager-ui/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { fuzzySearchTeam } from '@liga-manager-ui/utils';
import { Match, SeasonByIdGQL, Team } from '@liga-manager-api/graphql';
import { v4 } from 'uuid';
import { Apollo, gql } from 'apollo-angular';
import Papa from 'papaparse';
import { parse } from 'date-fns';
import { de } from 'date-fns/locale';
import { ManageSeasonBaseComponent } from '../manage-season.base.component';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '@liga-manager-ui/services';

@Component({
    selector: 'lima-import-season-plan',
    standalone: true,
    imports: [
        MatDialogModule,
        MatIconModule,
        TranslateModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        AsyncPipe,
        TeamAutoCompleteComponent,
        MatToolbarModule,
        MatCardModule,
        PitchAutoCompleteComponent,
        MatchComponent,
    ],
    templateUrl: './import-season-plan.component.html',
})
export class ImportSeasonPlanComponent extends ManageSeasonBaseComponent {

    private apollo = inject(Apollo);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private notificationService = inject(NotificationService);

    allTeams$ = this.store.select(TeamSelectors.teams);

    selectedSheetForTeams = new FormControl();

    selectedSheetForMatches = new FormControl();

    selectedSheetForPitches = new FormControl();

    allPitches$ = this.store.select(PitchSelectors.pitches);

    sheets = signal<string[]>([]);

    selectedCol = new FormControl();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    teamData = signal<any[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchData = signal<any[]>([]);

    teamsFromSheet = signal<string[]>([]);

    pitchesFromSheet = signal<string[]>([]);

    mapping = new FormGroup({
        teams: new FormArray<FormControl>([]),
        pitches: new FormArray<FormControl>([]),
    });

    selectedSeasonFC = new FormControl<string | undefined>('');

    teamMapping = signal<{ import?: string, team_id?: string}[]>([]);

    pitchMapping = signal<{ import?: string, pitch_id?: string}[]>([]);

    rawData = signal<any>([]);

    matchDays = signal<{ id: string, number: number, matches: Match[] }[]>([]);

    error = false;

    constructor() {
        super();
        this.mapping.controls.teams.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (t) => {
                const tm: { import?: string, team_id?: string}[] = [];
                t.forEach(
                    (team, i) => {
                        tm.push({ import: this.teamsFromSheet()[i], team_id: team?.id });
                    },
                );
                this.teamMapping.set(tm);
            },
        );

        this.mapping.controls.pitches.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (t) => {
                const tm: { import?: string, pitch_id?: string}[] = [];
                t.forEach(
                    (pitch, i) => {
                        tm.push({ import: this.pitchesFromSheet()[i], pitch_id: pitch?.id });
                    },
                );
                this.pitchMapping.set(tm);
            },
        );
    }

    async chooseFile() {
        const result = await FilePicker.pickFiles({ readData: true, limit: 1  });
        const file = result.files[0];
        const text = await file.blob?.text();
        const d = Papa.parse(text ||'', { header: true });
        this.rawData.set(d.data);
        const teams = new Set(d.data.map((d: any) => d['Heim']));
        this.teamsFromSheet.set([...teams]);
        this.mapping.controls.teams.clear();
        const allTeams = this.store.selectSnapshot(TeamSelectors.teams);
        for (const t of teams) {
            const maybeTeam = fuzzySearchTeam(t, allTeams);
            const fc = new FormControl<Team |undefined>(undefined, [ Validators.required ]);
            if (maybeTeam.length === 1) {
                fc.setValue(maybeTeam[0]);
            }
            fc.markAllAsTouched();
            this.mapping.controls.teams.push(fc);
        }

        const pitches = new Set(d.data.map((d: any) => d['Platz']));
        this.pitchesFromSheet.set([...pitches]);
        this.mapping.controls.pitches.clear();
        for (const _p of pitches) {
            const fc = new FormControl(undefined, [ Validators.required ]);
            fc.markAllAsTouched();
            this.mapping.controls.pitches.push(fc);
        }
    }

    previewMatches() {

        this.error = false;

        const teams = this.store.selectSnapshot(TeamSelectors.teams);

        const pitches = this.store.selectSnapshot(PitchSelectors.pitches);

        const m = new Array<{ id: string, number: number, matches: Match[] }>();

        try {
            this.rawData().forEach(
                (row: any) => {
                    const home_team_id = this.teamMapping().find((t) => row['Heim'] === t.import )?.team_id ||'';
                    const guest_team_id = this.teamMapping().find((t) => row['Auswärts'] === t.import )?.team_id ||'';
                    const pitch_id = this.pitchMapping().find((t) => row['Platz'] === t.import )?.pitch_id ||'';
                    const kickoff = parse(`${row['Datum']} ${row['Start']}`, 'P HH:mm:ss', new Date(), { locale: de }).toJSON();
                    const matchDayId = this.season()?.match_days?.find((md) => md?.number === +row['Spieltag'])?.id || '';

                    if (home_team_id === guest_team_id) {
                        throw new Error('ERROR.TEAM_CANT_PLAY_AGAINST_ITSELF');
                    }
                    if (matchDayId) {
                        const matchDay = m.find((x) => x.id === matchDayId);
                        const match = {
                            id: v4(),
                            home_team: teams.find((t) => t.id === home_team_id),
                            guest_team: teams.find((t) => t.id === guest_team_id),
                            pitch: pitches.find((p) => p.id === pitch_id),
                            kickoff,
                        };

                        if (!matchDay) {
                            m.push({
                                id: matchDayId,
                                number: row['Spieltag'],
                                matches: [match],
                            });
                        } else {
                            matchDay.matches.push(match);
                        }
                    }
                    else {
                        throw new Error('ERROR.NOT_ENOUGH_MATCHDAYS');
                    }
                },
            );
        } catch (error) {
            this.notificationService.showErrorNotification(error as string);
            this.error = true;
        }

        this.matchDays.set(m);
    }

    async submit() {
        let createMatchesMutation = 'mutation CreateMatches {\n';
        this.matchDays().forEach(
            (matchDay, mi) => {
                matchDay.matches.forEach(
                    (match, i) => {
                        createMatchesMutation += `createMatch${mi}_${i}: createMatch(id: "${match.id}", match_day_id: "${matchDay.id}", guest_team_id: "${match.guest_team.id}", home_team_id: "${match.home_team.id}") \n`;
                    },
                );
            },
        );
        createMatchesMutation += '}';

        await firstValueFrom(
            this.apollo.mutate(
                {
                    mutation: gql(createMatchesMutation),
                    refetchQueries: [
                        {
                            query: this.seasonByIdGQL.document,
                            variables: { id: this.season()?.id },
                        },
                    ],
                },
            ),
        );

        let editMatchMutation = 'mutation EditMatches {\n';
        this.matchDays().forEach(
            (matchDay, mi) => {
                matchDay.matches.forEach(
                    (match, i) => {
                        editMatchMutation += `scheduleMatch${mi}_${i}: scheduleMatch(match_id: "${match.id}", kickoff: "${match.kickoff}") \n`;
                        editMatchMutation += `locateMatch${mi}_${i}: locateMatch(match_id: "${match.id}", pitch_id: "${match.pitch?.id}") \n`;
                    },
                );
            },
        );
        editMatchMutation += '}';

        await firstValueFrom(
            this.apollo.mutate(
                {
                    mutation: gql(editMatchMutation),
                    refetchQueries: [
                        {
                            query: this.seasonByIdGQL.document,
                            variables: { id: this.season()?.id },
                        },
                    ],
                },
            ),
        );

    }

}
