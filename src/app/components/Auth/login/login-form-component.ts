import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login-form-component.html',
  styleUrl: './login-form-component.css'
})
export class LoginFormComponent {
 email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  submitForm(event: Event) {
    event.preventDefault();
    if (!this.email || !this.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert('Inicio de sesión exitoso. Bienvenido.');
    this.router.navigate(['/dashboard']);
  }
}
