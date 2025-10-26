import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="rounded-xl bg-white p-12 shadow-sm border border-gray-200">
          <div class="text-center">
            <div class="flex justify-center mb-6">
              <div class="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center">
                <svg class="h-10 w-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h1 class="text-3xl font-bold text-gray-900 mb-4">Calendar View</h1>
            <p class="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Visual calendar view with task scheduling and timeline planning is coming soon.
            </p>
            <a routerLink="/dashboard" class="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent {}
