import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./public/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./public/calendar.component').then(m => m.CalendarComponent)
  },
  {
    path: 'weather',
    loadComponent: () => import('./public/weather.component').then(m => m.WeatherComponent)
  },
  {
    path: 'resources',
    loadComponent: () => import('./public/resources.component').then(m => m.ResourcesComponent)
  },
  {
    path: 'ongoing-projects',
    loadComponent: () => import('./public/ongoing-projects.component').then(m => m.OngoingProjectsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./private/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./private/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  {
    path: 'farmer-id',
    loadComponent: () => import('./private/farmer-id.component').then(m => m.FarmerIdComponent),
    canActivate: [authGuard]
  },
  {
    path: 'farm-records',
    loadComponent: () => import('./private/farm-records.component').then(m => m.FarmRecordsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'notifications',
    loadComponent: () => import('./private/notifications.component').then(m => m.NotificationsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'commodities',
    loadComponent: () => import('./private/commodities.component').then(m => m.CommoditiesComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
