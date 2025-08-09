import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MatchService } from '@liga-manager-ui/services';
import { Observable, of } from 'rxjs';

export const matchResolver: ResolveFn<Observable<unknown>> = (route) => {

    const matchId = route.paramMap.get('matchid')
    return matchId ? inject(MatchService).getMatchById$(matchId) : of(null);

};
