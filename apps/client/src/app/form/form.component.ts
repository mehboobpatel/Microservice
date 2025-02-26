import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
})
export class FormComponent {
  isLogin = true; // To toggle between Login and Signup
  loginForm: FormGroup;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private http: HttpClient) {
    // Initialize Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Initialize Signup Form
    this.signupForm = this.fb.group({
      name: ['', Validators.required],  // Make sure fullname is required
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Switch to Login Form
  switchToLogin() {
    this.isLogin = true;
  }

  // Switch to Signup Form
  switchToSignup() {
    this.isLogin = false;
  }

  // Handle Login Submission
  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.post('http://localhost:3000/users/login', loginData).subscribe({
        next: (response: any) => {
          console.log(response)
          localStorage.setItem('userName', response.user); // Save the user's name in localStorage
          alert('Login successful.');
          this.router.navigate(['/welcome']); // Navigate to the welcome page
        },
        error: (error) => {
          const errorMessage = error.error.message || 'Login failed. Please try again.';
          alert(errorMessage);
          console.error('Login failed:', error);
        },
      });
    }
  }
  

  // Handle Signup Submission
  onSignup() {
    if (this.signupForm.valid) {
      const signupData = this.signupForm.value;

      // Check if fullname is filled in
      if (!signupData.name) {
        console.error('Full Name is required');
        return;
      }

      this.http.post('http://localhost:3000/users/signup', signupData).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          alert('Signup successful. Please check your email to verify your account.');
        },
        error: (error) => {
          console.error('Signup failed:', error);
          alert('Signup failed. Please try again.');
        },
      });
    }
  }
}
