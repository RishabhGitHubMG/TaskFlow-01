import { Injectable, signal, computed } from '@angular/core';
import { format, addDays, isBefore, isToday, isTomorrow } from 'date-fns';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  estimatedHours?: number;
  actualHours?: number;
  attachments?: string[];
  comments?: Comment[];
  subtasks?: Subtask[];
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>(this.loadTasksFromStorage());

  todos = computed(() => this.tasks().filter(task => task.status === 'todo'));
  inProgress = computed(() => this.tasks().filter(task => task.status === 'in-progress'));
  inReview = computed(() => this.tasks().filter(task => task.status === 'review'));
  completed = computed(() => this.tasks().filter(task => task.status === 'completed'));

  overdueTasks = computed(() => 
    this.tasks().filter(task => 
      isBefore(new Date(task.dueDate), new Date()) && task.status !== 'completed'
    )
  );

  todayTasks = computed(() => 
    this.tasks().filter(task => 
      isToday(new Date(task.dueDate)) && task.status !== 'completed'
    )
  );

  highPriorityTasks = computed(() => 
    this.tasks().filter(task => 
      ['high', 'urgent'].includes(task.priority) && task.status !== 'completed'
    )
  );

  addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.tasks.update(tasks => [newTask, ...tasks]);
    this.saveTasksToStorage();
  }

  updateTask(id: string, updates: Partial<Task>) {
    this.tasks.update(tasks => 
      tasks.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
    this.saveTasksToStorage();
  }

  deleteTask(id: string) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    this.saveTasksToStorage();
  }

  moveTask(taskId: string, newStatus: Task['status']) {
    this.updateTask(taskId, { status: newStatus });
  }

  getTask(id: string): Task | undefined {
    return this.tasks().find(task => task.id === id);
  }

  private generateId(): string {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private loadTasksFromStorage(): Task[] {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('taskflow-tasks');
      return stored ? JSON.parse(stored) : this.getDefaultTasks();
    }
    return this.getDefaultTasks();
  }

  private saveTasksToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskflow-tasks', JSON.stringify(this.tasks()));
    }
  }

  private getDefaultTasks(): Task[] {
    return [
      {
        id: '1',
        title: 'Implement real-time collaboration features',
        description: 'Add WebSocket integration for real-time task updates and team collaboration',
        status: 'in-progress',
        priority: 'high',
        assignee: 'john@taskflow.com',
        dueDate: addDays(new Date(), 3).toISOString(),
        tags: ['backend', 'socket.io', 'real-time'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedHours: 8,
        subtasks: [
          { id: '1-1', title: 'Setup WebSocket server', completed: true },
          { id: '1-2', title: 'Implement client-side handlers', completed: false },
          { id: '1-3', title: 'Add conflict resolution', completed: false }
        ]
      },
      {
        id: '2',
        title: 'Design new dashboard interface',
        description: 'Create modern and responsive dashboard with improved UX',
        status: 'review',
        priority: 'high',
        assignee: 'sarah@taskflow.com',
        dueDate: addDays(new Date(), 1).toISOString(),
        tags: ['design', 'frontend', 'ui/ux'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedHours: 6
      },
      {
        id: '3',
        title: 'Setup MongoDB schema',
        description: 'Define task and user collections with proper indexes',
        status: 'todo',
        priority: 'medium',
        assignee: 'mike@taskflow.com',
        dueDate: addDays(new Date(), 5).toISOString(),
        tags: ['database', 'backend'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedHours: 4
      },
      {
        id: '4',
        title: 'Write unit tests',
        description: 'Test conflict resolution algorithms',
        status: 'todo',
        priority: 'medium',
        assignee: 'emma@taskflow.com',
        dueDate: addDays(new Date(), 7).toISOString(),
        tags: ['testing', 'qa'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedHours: 6
      },
      {
        id: '5',
        title: 'Setup CI/CD pipeline',
        description: 'Configure automated testing and deployment',
        status: 'completed',
        priority: 'high',
        assignee: 'john@taskflow.com',
        dueDate: addDays(new Date(), -2).toISOString(),
        tags: ['devops', 'infrastructure'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedHours: 5
      }
    ];
  }
}
