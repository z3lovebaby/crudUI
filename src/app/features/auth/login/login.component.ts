import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toastr: ToastrService) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          //console.log('res login: ',response);
          // Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, false, 'Strict');

          this.cookieService.set('Refresh-Token', `${response.reToken}`,
            undefined, '/', undefined, false, 'Lax');

          // Set User
          this.authService.setUser({
            email: response.email,
            roles: response.roles
          });

          // Redirect back to Home
          this.router.navigateByUrl('/');
          this.toastr.success('Login successful!', 'Success', { positionClass: 'toast-bottom-right' });

        },
        error: (err) => {
          console.error('Login error: ', err);
    
          // Display toast notification for the error
          this.toastr.error('Login failed. Please check your credentials and try again.', 'Error', { positionClass: 'toast-bottom-right' });

        }
      });
  }
}
