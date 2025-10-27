import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { read, WorkBook, utils } from 'xlsx';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngxs/store';
import { AddTeamToSeason, TeamSelectors } from '@liga-manager-ui/states';
import { SeasonChooserComponent, TeamAutoCompleteComponent } from '@liga-manager-ui/components';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { fuzzySearchTeam } from '@liga-manager-ui/utils';
import { CreateMatchMutationVariables, Season, SeasonByIdGQL, Team } from '@liga-manager-api/graphql';
import { v4 } from 'uuid';
import { SeasonService } from '@liga-manager-ui/services';
import { firstValueFrom } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

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
        SeasonChooserComponent,
    ],
    templateUrl: './import-season-plan.component.html',
})
export class ImportSeasonPlanComponent {

    private apollo = inject(Apollo);

    private seasonByIdGQL = inject(SeasonByIdGQL);

    private store = inject(Store);

    private seasonService = inject(SeasonService);

    allTeams$ = this.store.select(TeamSelectors.teams);

    selectedSheetForTeams = new FormControl();

    selectedSheetForMatches = new FormControl();

    sheets = signal<string[]>([]);

    selectedCol = new FormControl();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    teamData = signal<any[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    matchData = signal<any[]>([]);

    destroyRef = inject(DestroyRef);

    workbook?: WorkBook;

    teamsFromSheet = signal<string[]>([]);

    teamMappingFC = new FormArray<FormControl>([]);

    selectedSeasonFC = new FormControl<string | undefined>('');

    teamMapping = signal<{ import?: string, team_id?: string}[]>([]);

    season?: Season | null;

    matches: Array<CreateMatchMutationVariables> = [];

    constructor() {

        this.selectedSeasonFC.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            async (seasonId) => {
                this.season = await firstValueFrom(this.seasonService.getSeasonById$(seasonId || '')) as Season;
            },
        );

        this.selectedSheetForTeams.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (sheet) => {
                const s = this.workbook?.Sheets[sheet];
                if (s) {
                    const json = utils.sheet_to_json(s);
                    this.teamData.set(json);
                    this.selectedCol.setValue('Team');
                }
            },
        );

        this.selectedCol.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (col) => {
                if (col) {
                    const teams = this.teamData().map((d) => d[col]);
                    this.teamsFromSheet.set(teams);
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
                }
            },
        );

        this.selectedSheetForMatches.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (sheet) => {
                const s = this.workbook?.Sheets[sheet];
                if (s) {
                    const json = utils.sheet_to_json(s);
                    console.log(json);
                    this.matchData.set(json);
                    this.matches = new Array<CreateMatchMutationVariables>();
                    json.forEach(
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (m: any) => {
                            const home_team_id = this.teamMapping().find((t) => m['Heim'] === t.import )?.team_id ||'';
                            const guest_team_id = this.teamMapping().find((t) => m['Auswärts'] === t.import )?.team_id ||'';
                            const match_day_id = this.season?.match_days?.find((md) => md?.number === m['Spieltag'])?.id || '';
                            this.matches.push({
                                id: v4(),
                                home_team_id,
                                guest_team_id,
                                match_day_id,
                            });
                        },
                    );
                }
            },
        );

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
    }

    async chooseFile() {
        const result = await FilePicker.pickFiles({ readData: true, limit: 1  });
        const file = result.files[0];
        this.workbook = read(file.data);
        this.sheets.set(this.workbook.SheetNames);
    }

    async addTeamsToSeason() {
        for (const t of this.teamMappingFC.value) {
            await this.store.dispatch(new AddTeamToSeason({ season_id: this.selectedSeasonFC.value!, team_id: t.id }, t.name, 'import'));
        }
    }

    createMatches() {
        let mutation = 'mutation CreateMatchesForSeason {\n';
        this.matches.forEach(
            (match, i) => {
                mutation += `createMatch${i}: createMatch(id: "${v4()}", match_day_id: "${match.match_day_id}", home_team_id: "${match.home_team_id}", guest_team_id: "${match.guest_team_id}" ) \n`;
            },
        );
        mutation += '}';
        console.log(mutation);
        firstValueFrom(this.apollo.mutate(
            {
                mutation: gql(mutation),
                refetchQueries: [
                    {
                        query: this.seasonByIdGQL.document,
                        variables: { id: this.season?.id },
                    },
                ],
            },
        ));
    }

}
