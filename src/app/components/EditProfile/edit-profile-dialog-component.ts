import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';


@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, Dialog],
  templateUrl: './edit-profile-dialog-component.html',
  styleUrl: './edit-profile-dialog-component.css'
})
export class EditProfileDialogComponent {

  //   visible = false;
  //   form: FormGroup;

  //   constructor(private fb: FormBuilder) {
  //     this.form = this.fb.group({
  //       name: ['', Validators.required],
  //       cedula: [''],
  //       phone: [''],
  //       email: ['', [Validators.email]],
  //       rank: [''],
  //       specialization: ['']
  //     });
  //   }

  //   showDialog() {
  //     this.visible = true;
  //   }

  //   onSubmit() {
  //     if (this.form.valid) {
  //       console.log('Datos del perfil:', this.form.value);
  //       this.visible = false;
  //     }
  //   }
  // }
  @Input() visible: boolean = false;

  form: FormGroup;

  // Lista de rangos militares para el select
  rangos: string[] = [
    'Soldado', 'Cabo', 'Sargento', 'Teniente',
    'Capitán', 'Capitán de Corbeta', 'Mayor',
    'Coronel', 'General'
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cedula: [''],
      phone: [''],
      email: ['', [Validators.email]],
      birthDate: [''],
      address: [''],
      rank: [''],
      specialization: [''],
      bio: [''],
      emergencyContact: [''],
      emergencyPhone: [''],
      profileImage: ['']
    });
  }

  showDialog() {
    this.visible = true;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('✅ Perfil actualizado:', this.form.value);
      this.visible = false;
    } else {
      console.log('⚠️ Formulario inválido');
    }
  }

  handleImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.form.patchValue({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
}
