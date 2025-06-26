import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/services';

export const userResolver: ResolveFn<Observable<unknown>> = () => {
    return inject(UserService).loadUser();
};
