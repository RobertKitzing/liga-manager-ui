import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { AlloyFinger, TouchSwipeEvent } from 'alloyfinger-typescript';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GestureService {

    swiped = new Subject<TouchSwipeEvent>();

    constructor() {
        new AlloyFinger(inject(DOCUMENT).body, {
            swipe: (e) => this.swiped.next(e),
        });
    }

}