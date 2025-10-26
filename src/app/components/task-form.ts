import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../services/task.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-8">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-gray-900">{{ task ? 'Edit Task' : 'Create New Task' }}</h2>
        <button (click)="onCancel()" class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
          <input 
            type="text" 
            [(ngModel)]="formData.title" 
            name="title"
            required
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            placeholder="Enter task title">
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            [(ngModel)]="formData.description" 
            name="description"
            rows="4"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            placeholder="Task description">
          </textarea>
        </div>

        <!-- Grid Layout -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Priority -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select 
              [(ngModel)]="formData.priority" 
              name="priority"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              [(ngModel)]="formData.status" 
              name="status"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all">
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="review">Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <!-- Assignee -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
            <select 
              [(ngModel)]="formData.assignee" 
              name="assignee"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all">
              <option value="">Unassigned</option>
              <option value="john@taskflow.com">John Doe</option>
              <option value="sarah@taskflow.com">Sarah Smith</option>
              <option value="mike@taskflow.com">Mike Johnson</option>
              <option value="emma@taskflow.com">Emma Wilson</option>
            </select>
          </div>

          <!-- Due Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
            <input 
              type="date" 
              [(ngModel)]="dueDateValue" 
              name="dueDate"
              (change)="updateDueDate()"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all">
          </div>

          <!-- Estimated Hours -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
            <input 
              type="number" 
              [(ngModel)]="formData.estimatedHours" 
              name="estimatedHours"
              min="0"
              max="100"
              class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
              placeholder="0">
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <input 
            type="text" 
            [(ngModel)]="tagInput" 
            name="tagInput"
            (keyup.enter)="addTag()"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 transition-all"
            placeholder="Add tags and press Enter">
          <div *ngIf="formData.tags.length > 0" class="flex flex-wrap gap-2 mt-3">
            <span *ngFor="let tag of formData.tags" class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {{ tag }}
              <button type="button" (click)="removeTag(tag)" class="text-primary-600 hover:text-primary-800">
                ×
              </button>
            </span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 pt-6 border-t border-gray-200">
          <button 
            type="submit" 
            [disabled]="isSubmitting()"
            class="flex-1 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-white font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
            <span *ngIf="!isSubmitting()">{{ task ? 'Update Task' : 'Create Task' }}</span>
            <span *ngIf="isSubmitting()" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ task ? 'Updating...' : 'Creating...' }}
            </span>
          </button>
          <button 
            type="button" 
            (click)="onCancel()"
            class="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `
})
export class TaskFormComponent {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Partial<Task>>();
  @Output() cancel = new EventEmitter<void>();

  isSubmitting = signal(false);
  tagInput = '';
  dueDateValue = '';

  formData: Partial<Task> = {
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assignee: '',
    tags: [],
    estimatedHours: 0
  };

  ngOnInit() {
    if (this.task) {
      this.formData = { ...this.task };
      if (this.task.dueDate) {
        this.dueDateValue = this.task.dueDate.split('T')[0];
      }
    }
  }

  addTag() {
    if (this.tagInput.trim() && !this.formData.tags?.includes(this.tagInput.trim())) {
      this.formData.tags = [...(this.formData.tags || []), this.tagInput.trim()];
      this.tagInput = '';
    }
  }

  removeTag(tag: string) {
    this.formData.tags = this.formData.tags?.filter(t => t !== tag) || [];
  }

  updateDueDate() {
    if (this.dueDateValue) {
      this.formData.dueDate = new Date(this.dueDateValue).toISOString();
    }
  }

  onSubmit() {
    if (this.formData.title?.trim()) {
      this.isSubmitting.set(true);
      
      setTimeout(() => {
        this.save.emit(this.formData);
        this.isSubmitting.set(false);
      }, 500);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
