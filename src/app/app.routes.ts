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
      { path: 'profile', loadComponent: () => import('./components/Profiles/profilecomponent').then(m => m.Profilecomponent) }


    ]
  },

 // Estas rutas deben ir fuera del layout principal
  {
    path: 'login',
    loadComponent: () => import('./components/Auth/login/login-form-component').then(m => m.LoginFormComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/Auth/Register/register-form-component').then(m => m.RegisterFormComponent)
  },

  // Esta debe ir siempre al final
  {
    path: '**',
    loadComponent: () => import('./components/NotFound/not-found').then(m => m.NotFound)
  }
];
