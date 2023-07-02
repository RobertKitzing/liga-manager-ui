import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RankingByIdGQL, RankingByIdQueryVariables } from 'src/api/graphql';

@Injectable({
    providedIn: 'root',
})
export class RankingService {

    constructor(private rankingGQL: RankingByIdGQL) {}

    getRanking$(params: RankingByIdQueryVariables) {
        return this.rankingGQL
            .watch(params)
            .valueChanges.pipe(map(({ data }) => data?.season?.ranking));
    }

}
