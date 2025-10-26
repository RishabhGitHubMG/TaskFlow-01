import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
          <p class="text-gray-600 mt-1">Manage your preferences and account settings</p>
        </div>
      </div>

      <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="space-y-6">
          <!-- Notifications -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Notifications</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Email Notifications</p>
                  <p class="text-sm text-gray-600">Receive email updates on task changes</p>
                </div>
                <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
              </div>
              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <p class="font-medium text-gray-900">Desktop Notifications</p>
                  <p class="text-sm text-gray-600">Get desktop alerts for important tasks</p>
                </div>
                <input type="checkbox" checked class="h-4 w-4 rounded border-gray-300" />
              </div>
            </div>
          </div>

          <!-- Appearance -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Appearance</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none">
                  <option selected>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Privacy -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">Privacy & Security</h2>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p class="text-sm text-gray-600">Add an extra layer of security</p>
                </div>
                <input type="checkbox" class="h-4 w-4 rounded border-gray-300" />
              </div>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="rounded-xl bg-red-50 p-6 shadow-sm border border-red-200">
            <h2 class="text-lg font-semibold text-red-900 mb-6">Danger Zone</h2>
            <button class="rounded-lg bg-red-600 px-6 py-3 text-white font-semibold hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {}
