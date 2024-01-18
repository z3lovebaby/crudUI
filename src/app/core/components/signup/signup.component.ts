import { Component } from '@angular/core';
import { SignupRequest } from '../../../features/auth/models/signup-request.model';
import { AuthService } from '../../../features/auth/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  model:SignupRequest;
  constructor(private authService: AuthService,
    private router: Router) {
    this.model = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cfPassword: '',
    };
  }

  onFormSubmit(): void {
    this.authService.signup(this.model)
    .subscribe({
      next: (response) => {
        // Set User
        // Redirect back to Home
        this.router.navigateByUrl('/');

      }
    });
  }
}
