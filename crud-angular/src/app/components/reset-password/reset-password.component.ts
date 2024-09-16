import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../http.service'; // Assuming you have HttpService for API calls
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  // Form group for managing the reset password form
  resetPasswordForm: FormGroup;
  private fb = inject(FormBuilder);
  private httpService = inject(HttpService);
  private router = inject(Router);
  toaster=inject(ToastrService);
  constructor() {
    // Initialize the form with validation rules
    this.resetPasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to check if newPassword and confirmPassword match
  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handle form submission for resetting the password
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const currentPassword = this.resetPasswordForm.get('currentPassword')?.value;
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
  
      // Call the HttpService to reset the password
      this.httpService.resetPassword(currentPassword, newPassword).subscribe(
        (result) => {
          // Handle successful password reset
          console.log(result);
          this.toaster.success("Password reset successfully.");
          this.router.navigate(['/login']); // Optionally navigate to another page
        },
        (error) => {
          // Handle error during password reset
          console.error(error);
          this.toaster.error("Failed to reset password. Please try again.")
        }
      );
    } else {
      // If form is invalid, show an alert to notify the user
      this.toaster.error("Please fill out the form correctly.");
    }
  }
}