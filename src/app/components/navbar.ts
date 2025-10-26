import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="border-b border-gray-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
              <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">TaskFlow Pro</h1>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center gap-1">
            <a 
              *ngFor="let link of navLinks" 
              [routerLink]="link.path" 
              routerLinkActive="text-primary-600 bg-primary-50 border-primary-200" 
              [routerLinkActiveOptions]="{exact: link.exact}"
              class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 border border-transparent transition-all duration-200">
              <span>{{ link.icon }}</span>
              {{ link.label }}
            </a>
          </div>

          <!-- User Menu -->
          <div class="flex items-center gap-4">
            <div *ngIf="authService.isAuthenticated()" class="flex items-center gap-3">
              <!-- Notifications -->
              <button class="relative p-2 text-gray-600 hover:text-primary-600 rounded-lg hover:bg-gray-100 transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              <!-- User Avatar -->
              <div class="flex items-center gap-2">
                <div class="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-medium">
                  {{ authService.getCurrentUser()?.name?.charAt(0)?.toUpperCase() }}
                </div>
                <div class="hidden sm:block text-sm">
                  <div class="font-medium text-gray-900">{{ authService.getCurrentUser()?.name }}</div>
                  <div class="text-gray-500 text-xs">{{ authService.getCurrentUser()?.role }}</div>
                </div>
              </div>

              <!-- Logout -->
              <button (click)="authService.logout()" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>

            <div *ngIf="!authService.isAuthenticated()" class="flex items-center gap-2">
              <a routerLink="/auth" class="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', exact: false },
    { path: '/calendar', label: 'Calendar', icon: '📅', exact: false },
    { path: '/team', label: 'Team', icon: '👥', exact: false },
    { path: '/analytics', label: 'Analytics', icon: '📈', exact: false },
    { path: '/settings', label: 'Settings', icon: '⚙️', exact: false }
  ];

  constructor(public authService: AuthService) {}
}
