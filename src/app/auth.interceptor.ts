import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {
    }
    public intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.headers.get('Authorization')) {
            return next.handle(req);
        }

        if (this.authService.accessToken) {
            return next.handle(req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
            }));
        }

        return next.handle(req);
    }
}
