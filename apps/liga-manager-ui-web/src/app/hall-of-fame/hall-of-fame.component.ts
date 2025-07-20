import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule, Sort } from '@angular/material/sort';
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
        MatSortModule,
        TranslateModule,
        MatCardModule,
        TeamLogoComponent,
    ],
    standalone: true,
    templateUrl: './hall-of-fame.component.html',
})
export class HallOfFameComponent {

    private hof = inject(HallOfFameGQL);

    displayedColumns = ['logo', 'team', 'championshipCount', 'tournamentCount'];

    winner = signal<{
        team: Pick<Team, 'id' | 'name' | 'logo_path'>;
        championshipCount: number;
        tournamentCount: number;
    }[]>([]);

    seasons$ = this.hof.watch().valueChanges.pipe(
        map((data) => data.data),
        map((data) => (
            {
                seasons: data?.allSeasons?.filter((s) => s?.state === SeasonState.Ended),
                tournaments: data?.allTournaments?.filter((s) => s?.state === TournamentState.Ended),
            }
        )),
        tap((data) => {
            this.winner.set([]);
            for (const season of data.seasons || []) {
                const winnerTeam = season?.ranking?.positions?.find((x) => x?.sort_index === 1)?.team;
                if (winnerTeam) {
                    const t = this.winner().find(
                        (w) => w.team.id === winnerTeam.id,
                    );
                    if (!t) {
                        this.winner().push({
                            team: winnerTeam,
                            championshipCount: 1,
                            tournamentCount: 0,
                        });
                    } else {
                        t.championshipCount++;
                    }
                }
            }
            for (const tournament of data.tournaments || []) {
                const lastRound = [...tournament?.rounds || []].pop();
                if (lastRound?.matches?.length === 1) {
                    const winnerTeam = lastRound?.matches.map((m) => {
                        if ((m?.home_score || 0) > (m?.guest_score || 0)) {
                            return m?.home_team;
                        }
                        return m?.guest_team;
                    })[0];
                    if (winnerTeam) {
                        const t = this.winner().find(
                            (w) => w.team.id === winnerTeam.id,
                        );
                        if (!t) {
                            this.winner().push({
                                team: winnerTeam,
                                championshipCount: 0,
                                tournamentCount: 1,
                            });
                        } else {
                            t.championshipCount++;
                        }
                    }
                }

            }
        }),
    );

    sortData(sort: Sort) {
        const isAsc = sort.direction === 'asc';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.winner.set(sortArrayBy(this.winner(), sort.active as any, isAsc ? 'asc' : 'desc'));
    }

    // getFirstRank() {
    //     const firstWinnerCount = this.winner[0].winnerCount;
    //     return this.winner.filter((x) => x.winnerCount === firstWinnerCount);
    // }

    // getSecondRank() {
    //     const firstWinnerCount = this.winner[0].winnerCount;
    //     let secondWinnerCount = 0;
    //     for (const t of this.winner) {
    //         if (t.winnerCount < firstWinnerCount) {
    //             secondWinnerCount = t.winnerCount;
    //             break;
    //         }
    //     }
    //     return this.winner.filter((x) => x.winnerCount === secondWinnerCount);
    // }

    // getThirdRank() {
    //     const firstWinnerCount = this.winner[0].winnerCount;
    //     let secondWinnerCount = 0;
    //     for (const t of this.winner) {
    //         if (t.winnerCount < firstWinnerCount) {
    //             secondWinnerCount = t.winnerCount;
    //             break;
    //         }
    //     }
    //     let thirdWinnerCount = 0;
    //     for (const t of this.winner) {
    //         if (t.winnerCount < secondWinnerCount) {
    //             thirdWinnerCount = t.winnerCount;
    //             break;
    //         }
    //     }
    //     return this.winner
    //         .filter((x) => x.winnerCount === thirdWinnerCount)
    //         .concat(
    //             this.winner.filter((x) => x.winnerCount === thirdWinnerCount),
    //         )
    //         .concat(
    //             this.winner.filter((x) => x.winnerCount === thirdWinnerCount),
    //         );
    // }

}
