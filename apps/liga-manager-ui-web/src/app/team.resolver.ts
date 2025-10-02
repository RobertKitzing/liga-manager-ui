import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TeamService } from '@liga-manager-ui/services';
import { Observable, of } from 'rxjs';

export const teamResolver: ResolveFn<Observable<unknown>> = (route) => {

    let teamid = route.queryParamMap.get('teamid');

    if (!teamid) {
        teamid = route.paramMap.get('teamid');
    }

    if (!teamid && route.parent) {
        teamid = route.parent.paramMap.get('teamid');
    }

    return teamid ? inject(TeamService).getTeamById(teamid) : of(null);

};
