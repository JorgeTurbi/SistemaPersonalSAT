import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/shared/layout/main-layout-component';

export const routes: Routes = [
   {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./components/Pages/main-page').then(m => m.MainPage) },
       { path: 'jobs', loadComponent: () => import('./components/Vacancies/vacante.component').then(m => m.VacanteComponent) },
      { path: 'jobsdetails', loadComponent: () => import('./components/VacanteDetalle/vacante-details').then(m => m.VacanteDetails) },
      { path: 'reclutador', loadComponent: () => import('./components/recruiter/recruiter-component').then(m => m.RecruiterComponent) },
      // { path: 'profile', loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent) },
      // { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
      // { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
    ]
  }
];
