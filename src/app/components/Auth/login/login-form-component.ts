import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Services/auth-service';

import { LoginRequest } from './InterfaceLogin/LoginRequest';
import { LoginData } from './InterfaceLogin/LoginData';
import { DataResponse } from '../../../Interface/Response';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { AplicanteProfileService } from '../../Profiles/ServiceProfile/aplicante-profile-service';


@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css',
  providers: [RippleModule]
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;
  LogInUser!: LoginRequest;
  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, private messageService: MessageService,
    private profileService: AplicanteProfileService
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submitForm() {
    localStorage.clear();
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    if (!this.loginForm.valid) {

      this.messageService.add({ severity: 'Info', summary: 'Por favor, completa todos los campos.' });
      return;
    }
    this.LogInUser = this.loginForm.value;
    this.auth.authLogin(this.LogInUser).subscribe({
      next: (res: DataResponse<LoginData>) => {


        if (res.success) {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
            if (res.data.perfil!=null) {
              this.profileService.setAplicanteProfile(res.data.perfil);
            }


          this.messageService.add({ severity: 'success', summary: "Login Exitoso", detail: res.message });
          this.messageService.add({ severity: 'info', summary: "Information", detail: "Redirigiendo" });

          this.router.navigate(['/inicio']);
        }
        else {
          this.messageService.add({ severity: 'error', summary: "Error intentando hacer login", detail: res.message });
          console.log(`Error: ${res.message}`);
        }

      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err || 'Error de autenticación' });
      }
    });


  }


}
