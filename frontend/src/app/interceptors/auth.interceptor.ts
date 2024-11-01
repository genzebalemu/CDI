import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');
        console.log("token interceptor", token)
        const authReq = token ? req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        }) : req;
        console.log("authReq",authReq)
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    console.error('Unauthorized request - possibly invalid token');
                }
                return throwError(error);
            })
        );
    }
}
