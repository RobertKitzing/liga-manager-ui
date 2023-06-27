import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingIndicatorService {
    loading$ = new BehaviorSubject<boolean>(false);

    constructor() {}
}
