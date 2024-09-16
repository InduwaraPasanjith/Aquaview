import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  builder = inject(FormBuilder);
  httpService = inject(HttpService);
  toaster=inject(ToastrService);
  router = inject(Router);
  loginForm = this.builder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onLogin() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
    
    if (this.loginForm.invalid) {
      this.toaster.error('Please fill in all required fields.');
      return;
    }
  
    this.httpService.login(email, password).subscribe({
      next: (result) => {
        if (result && result.token) {
          console.log(result);
          localStorage.setItem('token', result.token);
          this.toaster.success("Login successfully.");
          this.router.navigateByUrl('home');
        } else {
          this.toaster.error("Login unsuccessfully. Invalid login details.");
        }
      },
      error: (error) => {
        console.log(error);
        this.toaster.error("Login unsuccessfully. Please check your credentials.");
      }
    });
  }
}
