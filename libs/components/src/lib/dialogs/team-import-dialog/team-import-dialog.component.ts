import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { read, WorkBook, utils } from 'xlsx';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TeamAutoCompleteComponent } from '../../components';
import { Store } from '@ngxs/store';
import { TeamSelectors } from '@liga-manager-ui/states';

@Component({
    selector: 'lima-team-import-dialog',
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
        JsonPipe,
        TeamAutoCompleteComponent,
        AsyncPipe,
    ],
    templateUrl: './team-import-dialog.component.html',
})
export class TeamImportDialogComponent {

    private store = inject(Store);

    allTeams$ = this.store.select(TeamSelectors.teams);

    selectedSheet = new FormControl();

    sheets = signal<string[]>([]);

    selectedCol = new FormControl();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data = signal<any[]>([]);

    destroyRef = inject(DestroyRef);

    workbook?: WorkBook;

    teamsFromSheet = signal<string[]>([]);

    teamMapping = new FormArray<FormControl>([]);

    constructor() {

        this.selectedSheet.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (sheet) => {
                console.log(sheet);
                console.log(this.workbook?.Sheets[sheet]);
                const s = this.workbook?.Sheets[sheet];
                if (s) {
                    const json = utils.sheet_to_json(s);
                    this.data.set(json);
                    this.selectedCol.setValue('Team');
                }
                // console.log(this.workbook?.Sheets[sheet]['!cols']![this.col]);
                // this.data.set(this.workbook?.Sheets[sheet]['!cols'])
            },
        );

        this.selectedCol.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (col) => {
                if (col) {
                    const teams = this.data().map((d) => d[col]);
                    this.teamsFromSheet.set(teams);
                    this.teamMapping.clear();
                    for (const t of teams) {
                        this.teamMapping.push(new FormControl());
                    }
                }
            },
        );

        this.teamMapping.valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (t) => {
                console.log(t);
            },
        );
    }

    async chooseFile() {
        const result = await FilePicker.pickFiles({ readData: true, limit: 1  });
        const file = result.files[0];
        this.workbook = read(file.data);
        this.sheets.set(this.workbook.SheetNames);
    }

}
