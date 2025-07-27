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
  constructor(private router: Router, private auth: AuthService, private fb: FormBuilder, private messageService: MessageService) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submitForm() {
      console.log(this.loginForm.value);
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

            this.messageService.add({ severity: 'success', summary: "Login Exitoso", detail: res.message });
            this.router.navigate(['/']);
          }
          else{
            this.messageService.add({ severity: 'error', summary: "Error intentando hacer login", detail: res.message });
              console.log(`Error: ${res.message}`);
          }

        },
        error: (err:any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error de autenticación' });
        }
      });


  }


}
