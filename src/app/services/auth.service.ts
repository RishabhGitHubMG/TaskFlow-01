import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  team: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(this.loadUserFromStorage());
  isAuthenticated = signal<boolean>(!!this.currentUser());

  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    if (email && password) {
      const user: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        role: 'admin',
        team: 'Development'
      };
      
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.saveUserToStorage(user);
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem('taskflow-user');
    this.router.navigate(['/auth']);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  private loadUserFromStorage(): User | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('taskflow-user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  private saveUserToStorage(user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskflow-user', JSON.stringify(user));
    }
  }
}
