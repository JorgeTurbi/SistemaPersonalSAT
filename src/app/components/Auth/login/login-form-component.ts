import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../Services/auth-service';
import { AplicanteProfileService } from '../../Profiles/ServiceProfile/aplicante-profile-service';

import { LoginRequest } from './InterfaceLogin/LoginRequest';
import { LoginData } from './InterfaceLogin/LoginData';
import { DataResponse } from '../../../Interface/Response';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserSessionService } from '../Services/user-session.service';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule, // para <p-toast>
  ],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css',
  providers: [MessageService]
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  LogInUser!: LoginRequest;

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private profileService: AplicanteProfileService,
    private userSession:UserSessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submitForm() {
    if (!this.loginForm.valid) {
      this.messageService.add({
        severity: 'info',
        summary: 'Formulario',
        detail: 'Por favor, completa todos los campos.',
      });
      return;
    }

    this.LogInUser = this.loginForm.value;

    this.auth.authLogin(this.LogInUser).subscribe({
      next: (res: DataResponse<LoginData>) => {
        if (res?.success) {
          // No guardamos token: llega en cookie HttpOnly desde el backend

          // Guardamos info de usuario si la necesitas en el cliente
          if (res.data?.user) {
            this.userSession.setSession(res.data.user!);

          }

          // Perfil opcional (puede venir null)
          if (res.data?.perfil) {
            this.profileService.setAplicanteProfile(res.data.perfil);

          } else {
            this.profileService.clear?.();
          }

          this.messageService.add({
            severity: 'success',
            summary: 'Login Exitoso',
            detail: res.message ?? '',
          });
          this.messageService.add({
            severity: 'info',
            summary: 'Información',
            detail: 'Redirigiendo...',
          });

          this.router.navigate(['/inicio']);
        } else {
          const msg = res?.message ?? 'Error intentando hacer login';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
          console.error(`Login error: ${msg}`);
        }
      },
      error: (err: any) => {
        const detail = err?.error?.message || err?.message || 'Error de autenticación';
        this.messageService.add({ severity: 'error', summary: 'Error', detail });
        console.error('Login http error:', err);
      },
    });
  }
}
