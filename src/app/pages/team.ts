import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Team Management</h1>
              <p class="text-gray-600 mt-1">Manage your team members and collaboration</p>
            </div>
            <button class="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-white font-semibold hover:bg-primary-700 transition-colors">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Member
            </button>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div *ngFor="let team of teamService.getTeams()" class="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div class="p-6 border-b border-gray-200 bg-gray-50">
            <h2 class="text-xl font-bold text-gray-900">{{ team.name }}</h2>
            <p class="text-gray-600 text-sm mt-1">{{ team.description }}</p>
          </div>

          <div class="divide-y divide-gray-200">
            <div *ngFor="let member of team.members" class="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold">
                  {{ member.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ member.name }}</p>
                  <p class="text-sm text-gray-600">{{ member.email }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium" 
                      [class]="member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'">
                  {{ member.role }}
                </span>
                <button class="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TeamComponent {
  constructor(public teamService: TeamService) {}
}
