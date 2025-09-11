import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TeamService } from '@liga-manager-ui/services';
import { Observable, of } from 'rxjs';

export const teamResolver: ResolveFn<Observable<unknown>> = (route) => {

    const teamid = route.paramMap.get('teamid');
    return teamid ? inject(TeamService).getTeamById(teamid) : of(null);

};
