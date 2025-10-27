/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { AddTeamToSeason, PitchSelectors, TeamSelectors } from '@liga-manager-ui/states';
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

    teamMappingFC = new FormArray<FormControl>([]);

    selectedSeasonFC = new FormControl<string | undefined>('');

    teamMapping = signal<{ import?: string, team_id?: string}[]>([]);

    pitchMapping = signal<{ import?: string, pitch_id?: string}[]>([]);

    pitchMappingFC = new FormArray<FormControl>([]);

    rawData: any[] = [];

    matches = signal<{match: Match, matchDay: { id: string, number: number }}[]>([]);

    constructor() {
        super();
        this.teamMappingFC.valueChanges.pipe(
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

        this.pitchMappingFC.valueChanges.pipe(
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
        this.rawData = d.data as any[];
        const teams = new Set(d.data.map((d: any) => d['Heim']));
        this.teamsFromSheet.set([...teams]);
        this.teamMappingFC.clear();
        const allTeams = this.store.selectSnapshot(TeamSelectors.teams);
        for (const t of teams) {
            const maybeTeam = fuzzySearchTeam(t, allTeams);
            const fc = new FormControl<Team |undefined>(undefined, [ Validators.required ]);
            if (maybeTeam.length === 1) {
                fc.setValue(maybeTeam[0]);
            }
            this.teamMappingFC.push(fc);
        }

        const pitches = new Set(d.data.map((d: any) => d['Platz']));
        this.pitchesFromSheet.set([...pitches]);
        this.pitchMappingFC.clear();
        for (const _p of pitches) {
            const fc = new FormControl(undefined, [ Validators.required ]);
            this.pitchMappingFC.push(fc);
        }
    }

    async addTeamsToSeason() {
        for (const t of this.teamMappingFC.value) {
            await this.store.dispatch(new AddTeamToSeason({ season_id: this.selectedSeasonFC.value!, team_id: t.id }, t.name, 'import'));
        }
    }

    previewMatches() {

        const teams = this.store.selectSnapshot(TeamSelectors.teams);

        const pitches = this.store.selectSnapshot(PitchSelectors.pitches);

        const m = new Array<{match: Match, matchDay: { id: string, number: number }}>();

        this.rawData.forEach(
            (row) => {
                const home_team_id = this.teamMapping().find((t) => row['Heim'] === t.import )?.team_id ||'';
                const guest_team_id = this.teamMapping().find((t) => row['Auswärts'] === t.import )?.team_id ||'';
                const pitch_id = this.pitchMapping().find((t) => row['Platz'] === t.import )?.pitch_id ||'';
                const kickoff = parse(`${row['Datum']} ${row['Start']}`, 'P HH:mm:ss', new Date(), { locale: de }).toJSON();
                m.push({
                    matchDay: {
                        id: this.season()?.match_days?.find((md) => md?.number === +row['Spieltag'])?.id || '',
                        number: row['Spieltag'],
                    },
                    match: {
                        id: v4(),
                        home_team: teams.find((t) => t.id === home_team_id),
                        guest_team: teams.find((t) => t.id === guest_team_id),
                        pitch: pitches.find((p) => p.id === pitch_id),
                        kickoff,
                    },
                });
            },
        );
        this.matches.set(m);
    }

    async submit() {
        let createMatchesMutation = 'mutation CreateMatches {\n';
        this.matches().forEach(
            (param, i) => {
                createMatchesMutation += `createMatch${i}: createMatch(id: "${param.match.id}", match_day_id: "${param.matchDay.id}", guest_team_id: "${param.match.guest_team.id}", home_team_id: "${param.match.home_team.id}") \n`;
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
        this.matches().forEach(
            (param, i) => {
                editMatchMutation += `scheduleMatch${i}: scheduleMatch(match_id: "${param.match.id}", kickoff: "${param.match.kickoff}") \n`;
                editMatchMutation += `locateMatch${i}: locateMatch(match_id: "${param.match.id}", pitch_id: "${param.match.pitch?.id}") \n`;
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
