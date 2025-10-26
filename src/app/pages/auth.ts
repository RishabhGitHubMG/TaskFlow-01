import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div class="max-w-md w-full space-y-8">
        <!-- Header -->
        <div class="text-center">
          <div class="flex justify-center">
            <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-xl">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
          </div>
          <h2 class="mt-6 text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            Welcome to TaskFlow Pro
          </h2>
          <p class="mt-2 text-gray-600">Sign in to your account to continue</p>
        </div>

        <!-- Form -->
        <form (ngSubmit)="onSubmit()" class="mt-8 space-y-6 bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                [(ngModel)]="email" 
                name="email"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                placeholder="Enter your email">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                [(ngModel)]="password" 
                name="password"
                required
                class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
                placeholder="Enter your password">
            </div>
          </div>

          <div *ngIf="errorMessage" class="rounded-lg bg-red-50 p-4 border border-red-200">
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <button 
            type="submit" 
            [disabled]="isLoading()"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            <span *ngIf="!isLoading()">Sign in</span>
            <span *ngIf="isLoading()" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              Don't have an account? 
              <a href="#" class="font-medium text-primary-600 hover:text-primary-500 transition-colors">Sign up</a>
            </p>
          </div>
        </form>

        <!-- Demo Credentials -->
        <div class="text-center">
          <p class="text-xs text-gray-500">Use any email and password for demo</p>
        </div>
      </div>
    </div>
  `
})
export class AuthComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage = '';

    setTimeout(() => {
      if (this.authService.login(this.email, this.password)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
      this.isLoading.set(false);
    }, 1500);
  }
}
