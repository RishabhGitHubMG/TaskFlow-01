import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { TaskCardComponent } from '../components/task-card';
import { TaskFormComponent } from '../components/task-form';
import { format, isToday, isTomorrow } from 'date-fns';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent],
  template: `
    <div class="min-h-screen bg-gray-50/30">
      <!-- Header Stats -->
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p class="text-gray-600 mt-1">Welcome back, {{ authService.getCurrentUser()?.name }}! 👋</p>
            </div>
            <div class="flex items-center gap-3">
              <button (click)="toggleViewMode()" class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                {{ viewMode() === 'board' ? '📋 List View' : '📊 Board View' }}
              </button>
              <button (click)="toggleNewTaskForm()" class="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-all">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                New Task
              </button>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div class="flex items-center">
                <div class="rounded-lg bg-blue-100 p-3">
                  <svg class="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p class="text-2xl font-bold text-gray-900">{{ getTotalTasks() }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div class="flex items-center">
                <div class="rounded-lg bg-red-100 p-3">
                  <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Overdue</p>
                  <p class="text-2xl font-bold text-red-600">{{ taskService.overdueTasks().length }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div class="flex items-center">
                <div class="rounded-lg bg-green-100 p-3">
                  <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">Completed</p>
                  <p class="text-2xl font-bold text-green-600">{{ taskService.completed().length }}</p>
                </div>
              </div>
            </div>

            <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
              <div class="flex items-center">
                <div class="rounded-lg bg-yellow-100 p-3">
                  <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-600">In Progress</p>
                  <p class="text-2xl font-bold text-yellow-600">{{ taskService.inProgress().length }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <!-- Board View -->
        <div *ngIf="viewMode() === 'board'" class="grid grid-cols-1 gap-6 lg:grid-cols-4">

          <!-- To Do Column -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">To Do</h3>
              <span class="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                {{ taskService.todos().length }}
              </span>
            </div>
            <div class="min-h-[200px] space-y-3">
              <div *ngFor="let task of taskService.todos()" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <task-card [task]="task" (edit)="editTask(task)" (delete)="deleteTask(task.id)"></task-card>
              </div>
            </div>
          </div>

          <!-- In Progress Column -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">In Progress</h3>
              <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {{ taskService.inProgress().length }}
              </span>
            </div>
            <div class="min-h-[200px] space-y-3">
              <div *ngFor="let task of taskService.inProgress()" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <task-card [task]="task" (edit)="editTask(task)" (delete)="deleteTask(task.id)"></task-card>
              </div>
            </div>
          </div>

          <!-- Review Column -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Review</h3>
              <span class="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                {{ taskService.inReview().length }}
              </span>
            </div>
            <div class="min-h-[200px] space-y-3">
              <div *ngFor="let task of taskService.inReview()" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <task-card [task]="task" (edit)="editTask(task)" (delete)="deleteTask(task.id)"></task-card>
              </div>
            </div>
          </div>

          <!-- Completed Column -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Completed</h3>
              <span class="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {{ taskService.completed().length }}
              </span>
            </div>
            <div class="min-h-[200px] space-y-3">
              <div *ngFor="let task of taskService.completed()" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow opacity-60">
                <task-card [task]="task" (edit)="editTask(task)" (delete)="deleteTask(task.id)"></task-card>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div *ngIf="viewMode() === 'list'" class="space-y-4">
          <!-- Filters -->
          <div class="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select [(ngModel)]="selectedStatus" (change)="onFilterChange()" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">All Status</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select [(ngModel)]="selectedPriority" (change)="onFilterChange()" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <select [(ngModel)]="selectedAssignee" (change)="onFilterChange()" class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                  <option value="">All Assignees</option>
                  <option value="john@taskflow.com">John</option>
                  <option value="sarah@taskflow.com">Sarah</option>
                  <option value="mike@taskflow.com">Mike</option>
                  <option value="emma@taskflow.com">Emma</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input type="text" [(ngModel)]="searchQuery" (input)="onFilterChange()" placeholder="Search tasks..." class="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          </div>

          <!-- Tasks List -->
          <div class="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
            <div *ngFor="let task of filteredTasks()" class="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
              <div class="p-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4 flex-1">
                    <div [class]="getPriorityClass(task.priority)" class="h-3 w-3 rounded-full"></div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-lg font-semibold text-gray-900 truncate">{{ task.title }}</h4>
                      <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ task.description }}</p>
                      <div class="flex items-center gap-4 mt-2">
                        <span [class]="getStatusClass(task.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                          {{ formatStatus(task.status) }}
                        </span>
                        <span class="text-xs text-gray-500">Due: {{ formatDate(task.dueDate) }}</span>
                        <span class="text-xs text-gray-500">Assignee: {{ task.assignee }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button (click)="editTask(task)" class="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors">
                      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button (click)="deleteTask(task.id)" class="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
      </div>

      <!-- New Task Modal -->
      <div *ngIf="showNewTaskForm()" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <task-form 
            [task]="editingTask()"
            (save)="onTaskSave($event)"
            (cancel)="onTaskCancel()">
          </task-form>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  viewMode = signal<'board' | 'list'>('board');
  showNewTaskForm = signal(false);
  editingTask = signal<Task | null>(null);
  
  selectedStatus = '';
  selectedPriority = '';
  selectedAssignee = '';
  searchQuery = '';

  filteredTasks = signal<Task[]>([]);

  constructor(
    public taskService: TaskService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.updateFilteredTasks();
  }

  toggleViewMode() {
    this.viewMode.update(mode => mode === 'board' ? 'list' : 'board');
  }

  toggleNewTaskForm() {
    this.showNewTaskForm.update(v => !v);
    if (!this.showNewTaskForm()) {
      this.editingTask.set(null);
    }
  }

  editTask(task: Task) {
    this.editingTask.set(task);
    this.showNewTaskForm.set(true);
  }

  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id);
      this.updateFilteredTasks();
    }
  }

  onTaskSave(taskData: any) {
    if (this.editingTask()) {
      this.taskService.updateTask(this.editingTask()!.id, taskData);
    } else {
      this.taskService.addTask(taskData);
    }
    this.toggleNewTaskForm();
    this.updateFilteredTasks();
  }

  onTaskCancel() {
    this.toggleNewTaskForm();
  }

  onFilterChange() {
    this.updateFilteredTasks();
  }

  getTotalTasks(): number {
    return this.taskService.todos().length + 
           this.taskService.inProgress().length + 
           this.taskService.inReview().length + 
           this.taskService.completed().length;
  }

  private updateFilteredTasks() {
    const allTasks = [
      ...this.taskService.todos(),
      ...this.taskService.inProgress(),
      ...this.taskService.inReview(),
      ...this.taskService.completed()
    ];

    const filtered = allTasks.filter(task => {
      if (this.selectedStatus && task.status !== this.selectedStatus) return false;
      if (this.selectedPriority && task.priority !== this.selectedPriority) return false;
      if (this.selectedAssignee && task.assignee !== this.selectedAssignee) return false;
      if (this.searchQuery && !task.title.toLowerCase().includes(this.searchQuery.toLowerCase())) return false;
      return true;
    });

    this.filteredTasks.set(filtered);
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'in-progress': return 'In Progress';
      case 'todo': return 'To Do';
      case 'review': return 'Review';
      case 'completed': return 'Completed';
      default: return status;
    }
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd, yyyy');
  }
}
