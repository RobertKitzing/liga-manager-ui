import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RankingGQL, RankingQueryVariables } from 'src/api/graphql';

@Injectable({
    providedIn: 'root',
})
export class RankingService {
    constructor(private rankingGQL: RankingGQL) {}

    getRanking$(params: RankingQueryVariables) {
        return this.rankingGQL
            .watch(params)
            .valueChanges.pipe(map(({ data }) => data?.season?.ranking));
    }
}
