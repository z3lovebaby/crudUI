import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptRequest(request)) {
      const authRequest = this.addAuthorizationHeader(request);

      return next.handle(authRequest).pipe(
        catchError((error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            // Token expired, try refreshing the token
            return this.handleTokenRefresh(request, next);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(request);
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1;
  }

  private addAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        'Authorization': this.cookieService.get('Authorization')
      }
    });
  }

  private handleTokenRefresh(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.refreshToken().pipe(
      switchMap((newToken: string) => {
        // Update the stored token in the cookie or wherever you store it
        this.cookieService.set('Authorization', newToken);

        // Retry the request with the new token
        const authRequest = this.addAuthorizationHeader(request);
        return next.handle(authRequest);
      }),
      catchError((error) => {
        // If token refresh fails, redirect to login or handle as needed
        // For simplicity, we rethrow the error here
        return throwError(error);
      })
    );
  }
}
