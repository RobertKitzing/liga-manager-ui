import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService, UserService } from './shared/services';

export const userResolver: ResolveFn<Observable<unknown>> = () => {

    if (inject(AuthenticationService).accessToken) {
        return inject(UserService).loadUser();
    }
    return of({});

};
