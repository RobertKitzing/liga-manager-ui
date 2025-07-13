import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { AuthenticationService, UserService } from '@liga-manager-ui/services';
import { Observable, of } from 'rxjs';

export const userResolver: ResolveFn<Observable<unknown>> = () => {

    if (inject(AuthenticationService).accessToken()) {
        return inject(UserService).loadUser();
    }
    return of({});

};
