import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="bg-white">
      <!-- Hero Section -->
      <section class="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div class="absolute inset-0 -z-10">
          <div class="absolute -top-40 right-0 h-80 w-80 rounded-full bg-primary-100 opacity-20 blur-3xl"></div>
          <div class="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-primary-200 opacity-20 blur-3xl"></div>
        </div>
        
        <div class="mx-auto max-w-4xl text-center">
          <h1 class="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
            Real-time Task Management for Modern Teams
          </h1>
          <p class="mt-6 text-xl text-secondary-600 max-w-2xl mx-auto">
            TaskFlow is a collaborative task management tool designed to keep your team synchronized. 
            Real-time updates, advanced filtering, and conflict resolution—all in one beautiful platform.
          </p>
          <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a routerLink="/dashboard" class="inline-flex items-center justify-center rounded-lg bg-primary-600 px-8 py-3 font-semibold text-white hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
              Get Started
              <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a href="#features" class="inline-flex items-center justify-center rounded-lg border-2 border-primary-200 px-8 py-3 font-semibold text-primary-600 hover:bg-primary-50 transition-colors">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="border-y border-secondary-200 bg-secondary-50 px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div class="text-center">
              <p class="text-4xl font-bold text-primary-600">500+</p>
              <p class="mt-2 text-secondary-600">Active Team Members</p>
            </div>
            <div class="text-center">
              <p class="text-4xl font-bold text-primary-600">&lt;100ms</p>
              <p class="mt-2 text-secondary-600">Real-time Sync Latency</p>
            </div>
            <div class="text-center">
              <p class="text-4xl font-bold text-primary-600">90%</p>
              <p class="mt-2 text-secondary-600">Reduction in Overhead</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-3xl font-bold text-secondary-900 sm:text-4xl mb-16">
            Powerful Features for Team Collaboration
          </h2>
          
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature 1: Real-time Updates -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Real-time Updates</h3>
              <p class="mt-2 text-secondary-600">
                WebSocket-powered instant synchronization keeps all team members on the same page.
              </p>
            </div>

            <!-- Feature 2: Advanced Filtering -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Advanced Filtering</h3>
              <p class="mt-2 text-secondary-600">
                Filter tasks by priority, assignee, deadline, and custom tags for maximum productivity.
              </p>
            </div>

            <!-- Feature 3: Conflict Resolution -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Conflict Resolution</h3>
              <p class="mt-2 text-secondary-600">
                Intelligent algorithms handle concurrent edits automatically without data loss.
              </p>
            </div>

            <!-- Feature 4: Collaboration -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0H9m6 0H9m6 0H9M19 6.5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Team Collaboration</h3>
              <p class="mt-2 text-secondary-600">
                Assign tasks, mention team members, and keep conversations organized in one place.
              </p>
            </div>

            <!-- Feature 5: Activity Tracking -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Activity Tracking</h3>
              <p class="mt-2 text-secondary-600">
                Complete audit trail of all changes and activity for accountability and transparency.
              </p>
            </div>

            <!-- Feature 6: Mobile Ready -->
            <div class="rounded-xl border border-secondary-200 bg-white p-8 hover:shadow-lg transition-shadow">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg class="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 20h8a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-semibold text-secondary-900">Mobile Ready</h3>
              <p class="mt-2 text-secondary-600">
                Access your tasks from any device with full functionality and responsiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Stack -->
      <section class="border-y border-secondary-200 bg-secondary-50 px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-3xl font-bold text-secondary-900 sm:text-4xl mb-16">
            Built with Modern Technology
          </h2>
          
          <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
              <div class="text-4xl mb-2">⚛️</div>
              <p class="font-semibold text-secondary-900">Angular</p>
              <p class="text-xs text-secondary-600 mt-1">Frontend</p>
            </div>
            <div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
              <div class="text-4xl mb-2">🔗</div>
              <p class="font-semibold text-secondary-900">Node.js</p>
              <p class="text-xs text-secondary-600 mt-1">Backend</p>
            </div>
            <div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
              <div class="text-4xl mb-2">🗄️</div>
              <p class="font-semibold text-secondary-900">MongoDB</p>
              <p class="text-xs text-secondary-600 mt-1">Database</p>
            </div>
            <div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
              <div class="text-4xl mb-2">⚡</div>
              <p class="font-semibold text-secondary-900">Socket.io</p>
              <p class="text-xs text-secondary-600 mt-1">Real-time</p>
            </div>
            <div class="flex flex-col items-center rounded-lg bg-white p-6 shadow-sm">
              <div class="text-4xl mb-2">🔄</div>
              <p class="font-semibold text-secondary-900">RxJS</p>
              <p class="text-xs text-secondary-600 mt-1">Reactive</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="px-4 py-20 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-16 text-center">
          <h2 class="text-3xl font-bold text-white">Ready to Transform Your Workflow?</h2>
          <p class="mt-4 text-lg text-primary-100">
            Join 500+ teams already using TaskFlow to improve collaboration and productivity.
          </p>
          <a routerLink="/dashboard" class="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-primary-600 hover:bg-primary-50 transition-colors">
            Start Using TaskFlow
            <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="border-t border-secondary-200 bg-secondary-900 text-white px-4 py-12 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-6xl">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                  <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span class="font-bold">TaskFlow</span>
              </div>
              <p class="text-secondary-400">Real-time task management for modern teams.</p>
            </div>
            <div>
              <h3 class="font-semibold mb-4">Product</h3>
              <ul class="space-y-2 text-secondary-400">
                <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 class="font-semibold mb-4">Company</h3>
              <ul class="space-y-2 text-secondary-400">
                <li><a href="#" class="hover:text-white transition-colors">About</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" class="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-secondary-800 pt-8">
            <p class="text-center text-secondary-400">© 2024 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class HomePage {}
