import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
          <p class="text-gray-600 mt-1">Manage your personal information</p>
        </div>
      </div>

      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="space-y-6">
          <!-- Profile Card -->
          <div class="rounded-xl bg-white p-8 shadow-sm border border-gray-200">
            <div class="text-center mb-8">
              <div class="h-24 w-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-4xl mx-auto">
                {{ authService.getCurrentUser()?.name?.charAt(0) }}
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mt-4">{{ authService.getCurrentUser()?.name }}</h2>
              <p class="text-gray-600 mt-1">{{ authService.getCurrentUser()?.role | uppercase }}</p>
            </div>

            <form class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  [value]="authService.getCurrentUser()?.name"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Full name">
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  [value]="authService.getCurrentUser()?.email"
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Email address">
              </div>

              <!-- Team -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Team</label>
                <input 
                  type="text" 
                  [value]="authService.getCurrentUser()?.team"
                  disabled
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-600 bg-gray-50"
                  placeholder="Team">
              </div>

              <!-- Buttons -->
              <div class="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                  type="submit"
                  class="flex-1 rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-colors">
                  Save Changes
                </button>
                <button 
                  type="button"
                  class="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="rounded-xl bg-white p-8 shadow-sm border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-6">Change Password</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input 
                  type="password" 
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Current password">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  type="password" 
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none"
                  placeholder="New password">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none"
                  placeholder="Confirm password">
              </div>

              <button 
                type="submit"
                class="w-full rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-colors">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  constructor(public authService: AuthService) {}
}
