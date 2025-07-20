import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/shared/layout/main-layout-component';

export const routes: Routes = [
   {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./components/Pages/main-page').then(m => m.MainPage) },
      // { path: 'jobs', loadComponent: () => import('./pages/jobs/jobs.component').then(m => m.JobsComponent) },
      // { path: 'jobs/:id', loadComponent: () => import('./pages/job-detail/job-detail.component').then(m => m.JobDetailComponent) },
      // { path: 'create-job', loadComponent: () => import('./pages/create-job/create-job.component').then(m => m.CreateJobComponent) },
      // { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      // { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      // { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
    ]
  }
];
