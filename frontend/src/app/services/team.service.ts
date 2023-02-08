import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AllTeamsGQL } from 'src/api/graphql';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  allTeams$ = this.allTeamsGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allTeams),
    map((teams) => {
      return [...teams!].sort((a, b) => a?.name.toLocaleLowerCase()! >= b?.name.toLocaleLowerCase()! ? 1 : -1)
    })
  );

  constructor(
    private allTeamsGQL: AllTeamsGQL,
  ) { }

}
