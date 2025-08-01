import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/shared/layout/main-layout-component';
import { authGuard } from './components/Guards/auth-guard';

export const routes: Routes = [
  {

    path: '',
    redirectTo: 'inicio', // Redirige automáticamente al login
    pathMatch: 'full'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./components/Pages/main-page').then(m => m.MainPage)

      },
      {
        path: 'jobs', loadComponent: () => import('./components/Vacancies/vacante.component').then(m => m.VacanteComponent),
        canActivate: [authGuard],
           data: { roles: ['Admin', 'User'] } // 🔹 Todos pueden entrar
      },
      {
        path: 'jobsdetails/:id', loadComponent: () => import('./components/VacanteDetalle/vacante-details').then(m => m.VacanteDetails),
        canActivate: [authGuard],
            data: { roles: ['Admin', 'User'] } // 🔹 Todos pueden entrar
      },
      {
        path: 'reclutador', loadComponent: () => import('./components/recruiter/recruiter-component').then(m => m.RecruiterComponent),
        canActivate: [authGuard],
          data: { roles: ['Admin'] } // 🔹 Todos pueden entrar
      },
      {
        path: 'profile', loadComponent: () => import('./components/Profiles/profilecomponent').then(m => m.Profilecomponent),
        canActivate: [authGuard],
      data: { roles: ['Admin', 'User'] } // 🔹 Todos pueden entrar
      }


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
