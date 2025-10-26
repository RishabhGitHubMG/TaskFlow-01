import { Routes } from '@angular/router';
import { HomePage } from './pages/home';
import { DashboardComponent } from './pages/dashboard';
import { AuthComponent } from './pages/auth';
import { AnalyticsComponent } from './pages/analytics';
import { TeamComponent } from './pages/team';
import { CalendarComponent } from './pages/calendar';
import { SettingsComponent } from './pages/settings';
import { ProfileComponent } from './pages/profile';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'auth', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] },
  { path: 'team', component: TeamComponent, canActivate: [authGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/dashboard' }
];
