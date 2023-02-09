import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AllUsersGQL } from 'src/api/graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  allUsers$ = this.allUsersGQL.watch().valueChanges.pipe(
    map(({ data }) => data.allUsers),
    map((teams) => {
      return [...teams!].sort((a, b) => a?.email.toLocaleLowerCase()! >= b?.email.toLocaleLowerCase()! ? 1 : -1)
    })
  );

  constructor(
    private allUsersGQL: AllUsersGQL,
  ) { }

}
