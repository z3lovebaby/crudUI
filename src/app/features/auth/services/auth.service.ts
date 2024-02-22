import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable, map,throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { SignupRequest } from '../models/signup-request.model';
import { Token } from '../models/tokens.model';
import { NavigationExtras, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/SignIn`, {
      email: request.email,
      password: request.password
    });
  }
  signup(request: SignupRequest): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiBaseUrl}/api/Auth/SignUp?addAuth=true`, {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      passWord: request.password,
      rePassWord: request.cfPassword
    });
  }


  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    console.log('fail');
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.cookieService.delete('Refresh-Token', '/');
    this.$user.next(undefined);
    // Redirect to the /login component
    const navigationExtras: NavigationExtras = {
      queryParams: { returnUrl: this.router.routerState.snapshot.url },
    };
    this.router.navigate(['/login'], navigationExtras);
  }

  refreshToken(): Observable<string> {
    var refreshToken = this.cookieService.get('Refresh-Token');
    var accessToken = this.cookieService.get('Authorization');
    accessToken = accessToken.replace('Bearer ', '')
    if (!refreshToken || !accessToken) {
      // Handle the case where either refresh token or access token is missing
      // You may want to redirect to the login page or perform some other action.
      return throwError('Refresh token or access token is missing.');
    }

    // Example: Assuming there is an API endpoint for token refreshing
    const refreshTokenRequest = {
      AccessToken: accessToken,
      RefreshToken: refreshToken
    };
    console.log(refreshTokenRequest);
    return this.http.post<Token>(`${environment.apiBaseUrl}/api/Auth/refresh`, refreshTokenRequest)
      .pipe(
        map(response => {
          // Assuming the server returns a LoginResponseDto object
          const newAccessToken = response?.token;
          const newRefreshToken = response?.reToken;
          console.log('response 1: ',response.token);
          if (!newAccessToken) {
            // Handle the case where the server did not return a new access token
            throw new Error('No new access token received.');
          }
          if (!newRefreshToken) {
            // Handle the case where the server did not return a new access token
            throw new Error('No new refresh token received.');
          }
          // Update the stored token in the cookie or wherever you store it
          //this.cookieService.set('Authorization', newAccessToken);
          this.cookieService.set('Refresh-Token', newRefreshToken,undefined, '/', undefined, false, 'Strict');
          this.cookieService.set('Authorization', `Bearer ${newAccessToken}`,
            undefined, '/', undefined, false, 'Strict');

          return newAccessToken;
        })
      );
  }


}
