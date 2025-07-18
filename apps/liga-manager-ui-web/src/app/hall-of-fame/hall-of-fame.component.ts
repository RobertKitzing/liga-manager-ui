import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { HallOfFameGQL, SeasonState, Team, TournamentState } from '@liga-manager-api/graphql';
import { TeamLogoComponent } from '@liga-manager-ui/components';
import { sortArrayBy } from '@liga-manager-ui/utils';
import { TranslateModule } from '@ngx-translate/core';
import { map, tap } from 'rxjs';

@Component({
    selector: 'lima-hall-of-fame',
    imports: [
        AsyncPipe,
        MatTableModule,
        TranslateModule,
        MatCardModule,
        TeamLogoComponent,
    ],
    standalone: true,
    templateUrl: './hall-of-fame.component.html',
})
export class HallOfFameComponent {

    displayedColumns = ['logo', 'team', 'winnerCount'];

    winner!: {
        team: Pick<Team, 'id' | 'name' | 'logo_path'>;
        winnerCount: number;
    }[];

    seasons$ = this.hof.watch().valueChanges.pipe(
        map((data) => data.data),
        map((data) => (
            {
                seasons: data?.allSeasons?.filter((s) => s?.state === SeasonState.Progress),
                tournaments: data?.allTournaments?.filter((s) => s?.state === TournamentState.Ended),
            }
        )),
        tap((data) => {
            this.winner = [];
            for (const season of data.seasons || []) {
                const winnerTeam = season?.ranking?.positions![0]?.team;
                if (winnerTeam) {
                    const t = this.winner.find(
                        (w) => w.team.id === winnerTeam.id,
                    );
                    if (!t) {
                        this.winner.push({
                            team: winnerTeam,
                            winnerCount: 1,
                        });
                    } else {
                        t.winnerCount++;
                    }
                }
            }
            this.winner = sortArrayBy(this.winner, 'winnerCount', 'desc');
        }),
    );

    constructor(private hof: HallOfFameGQL) {}

    getFirstRank() {
        const firstWinnerCount = this.winner[0].winnerCount;
        return this.winner.filter((x) => x.winnerCount === firstWinnerCount);
    }

    getSecondRank() {
        const firstWinnerCount = this.winner[0].winnerCount;
        let secondWinnerCount = 0;
        for (const t of this.winner) {
            if (t.winnerCount < firstWinnerCount) {
                secondWinnerCount = t.winnerCount;
                break;
            }
        }
        return this.winner.filter((x) => x.winnerCount === secondWinnerCount);
    }

    getThirdRank() {
        const firstWinnerCount = this.winner[0].winnerCount;
        let secondWinnerCount = 0;
        for (const t of this.winner) {
            if (t.winnerCount < firstWinnerCount) {
                secondWinnerCount = t.winnerCount;
                break;
            }
        }
        let thirdWinnerCount = 0;
        for (const t of this.winner) {
            if (t.winnerCount < secondWinnerCount) {
                thirdWinnerCount = t.winnerCount;
                break;
            }
        }
        return this.winner
            .filter((x) => x.winnerCount === thirdWinnerCount)
            .concat(
                this.winner.filter((x) => x.winnerCount === thirdWinnerCount),
            )
            .concat(
                this.winner.filter((x) => x.winnerCount === thirdWinnerCount),
            );
    }

}
