import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, X, Upload, Search } from 'lucide-angular';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
  templateUrl: './register-form-component.html',
  styleUrl: './register-form-component.css'
})
export class RegisterFormComponent {
  userType: string = 'personal';
  logoFile: File | null = null;
  logoPreview: string = '';
  email: string = '';
  fullName: string = '';
  institution: string = '';
  password: string = '';
  confirmPassword: string = '';
  X = X;
  Upload = Upload;
  cedula: string = '';
  Search = Search;
  selectedInstitution: string = '';
  selectedInstitutionLogo: string = '';
  nombres: string = '';
  apellidos: string = '';
  departamento: string = '';
  constructor(private router: Router) { }
  institutions = [
    { id: 'c5i', name: 'C5i', logoUrl: '/images/logo/c5iLogo.png' },
    { id: 'MIDE', name: 'Fuerzas Armadas', logoUrl: '/images/logo/mideLogo.png' },
    { id: 'Otro', name: 'Otro', logoUrl: '/images/portadaMide.webp' }
  ];

  departamentos = [
    { id: '1', nombre: 'Recursos Humanos' },
    { id: '2', nombre: 'Tecnología' },
    { id: '3', nombre: 'Inteligencia' },
    { id: '4', nombre: 'CiberSeguridad' },
    // ...otros departamentos
  ];

  onInstitutionChange() {
    const inst = this.institutions.find(i => i.id === this.selectedInstitution);
    this.selectedInstitutionLogo = inst?.logoUrl ?? '';
  }
  handleLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  buscarCedula() {
    console.log('Buscando información para la cédula:', this.cedula);
    // Aquí puedes agregar lógica para buscar los datos del usuario por cédula
  }
  removeLogo() {
    this.logoFile = null;
    this.logoPreview = '';
  }

  submitForm(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    alert('Registro exitoso. Redirigiendo...');
    if (this.userType === 'personal') {
      this.router.navigate(['/create-profile']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
