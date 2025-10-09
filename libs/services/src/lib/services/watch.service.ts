import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PitchesGQL, SeasonListGQL, TeamListGQL, TournamentListGQL } from '@liga-manager-api/graphql';
import { SetPitches, SetSeasons, SetTeams, SetTournaments } from '@liga-manager-ui/states';
import { Store } from '@ngxs/store';

@Injectable({
    providedIn: 'root',
})
export class WatchService {

    private tournamentListGQL = inject(TournamentListGQL);

    private seasonListGQL = inject(SeasonListGQL);

    private teamListGQL = inject(TeamListGQL);

    private pitchesGQL = inject(PitchesGQL);

    private store = inject(Store);

    private destroyRef = inject(DestroyRef);

    init() {

        this.pitchesGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetPitches(result.data.allPitches));
            },
        );

        this.teamListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetTeams(result.data.allTeams));
            },
        );

        this.seasonListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetSeasons(result.data.allSeasons));
            },
        );

        this.tournamentListGQL.watch().valueChanges.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(
            (result) => {
                this.store.dispatch(new SetTournaments(result.data.allTournaments));
            },
        );
    }

}