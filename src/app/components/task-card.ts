import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../services/task.service';
import { format, isToday, isTomorrow } from 'date-fns';

@Component({
  selector: 'task-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      <!-- Header -->
      <div class="flex items-start justify-between">
        <h4 class="font-semibold text-gray-900 text-sm leading-tight">{{ task.title }}</h4>
        <span [class]="getPriorityClass(task.priority)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
          {{ task.priority }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-gray-600 text-sm line-clamp-2">{{ task.description }}</p>

      <!-- Tags -->
      <div *ngIf="task.tags.length > 0" class="flex flex-wrap gap-1">
        <span *ngFor="let tag of task.tags" 
              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
          {{ tag }}
        </span>
      </div>

      <!-- Progress -->
      <div *ngIf="task.subtasks && task.subtasks.length > 0" class="space-y-2">
        <div class="flex justify-between text-xs text-gray-600">
          <span>Progress</span>
          <span>{{ getCompletedSubtasks() }}/{{ task.subtasks.length }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-primary-600 h-2 rounded-full" 
               [style.width]="(getCompletedSubtasks() / task.subtasks.length) * 100 + '%'">
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-200">
        <div class="flex items-center gap-2">
          <div class="h-6 w-6 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-medium">
            {{ task.assignee?.charAt(0)?.toUpperCase() || '?' }}
          </div>
          <span class="text-xs text-gray-600">{{ getDueDateText() }}</span>
        </div>
        <div class="flex items-center gap-1">
          <button (click)="edit.emit(task)" class="p-1 text-gray-400 hover:text-primary-600 rounded transition-colors">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button (click)="delete.emit(task.id)" class="p-1 text-gray-400 hover:text-red-600 rounded transition-colors">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getCompletedSubtasks(): number {
    return this.task.subtasks?.filter(st => st.completed).length || 0;
  }

  getDueDateText(): string {
    if (!this.task.dueDate) return '';
    
    const date = new Date(this.task.dueDate);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM dd');
  }
}
