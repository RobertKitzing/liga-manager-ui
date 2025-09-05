/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingIndicatorService } from '@liga-manager-ui/services';

@Injectable({
    providedIn: 'root',
})
export class LoadingIndicatorHttpInterceptor implements HttpInterceptor {

    loadingIndicatorService = inject(LoadingIndicatorService);

    requestCounter = 0;

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.beginRequest();
        return next.handle(req).pipe(
            finalize(() => {
                this.endRequest();
            }),
        );
    }

    beginRequest() {
        this.requestCounter = Math.max(this.requestCounter, 0) + 1;

        if (this.requestCounter === 1) {
            this.loadingIndicatorService.loading$.next(true);
        }
    }

    endRequest() {
        this.requestCounter = Math.max(this.requestCounter, 1) - 1;

        if (this.requestCounter === 0) {
            this.loadingIndicatorService.loading$.next(false);
        }
    }

}
