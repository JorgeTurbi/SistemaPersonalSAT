
import { CommonModule } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Search, Filter, MapPin, Building, Briefcase } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FiltroComponent } from "../Filtro/filtro-component";
import { VacanteListComponent } from '../VacancyList/vacante-list';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';


@Component({
  selector: 'app-vacante',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule,ReactiveFormsModule, ToastModule, FiltroComponent, VacanteListComponent,Dialog,ButtonModule,StyleClassModule],
  templateUrl: './vacante.component.html',
  styleUrl: './vacante.component.css',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class VacanteComponent {
  Briefcase = Briefcase;
    form: FormGroup;
  logoPreview: string | null = null;
  isCreateJobOpen = false;
     visible: boolean = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      institution: ['', Validators.required],
      location: ['', Validators.required],
      type: ['', Validators.required],
      category: ['', Validators.required],
      salary: [''],
      deadline: [''],
      workSchedule: [''],
      contractDuration: [''],
      description: ['', Validators.required],
      responsibilities: [''],
      requirements: ['', Validators.required],
      education: [''],
      experience: [''],
      skills: [''],
      benefits: [''],
      contact: ['', Validators.required]
    });
  }
    showDialog() {
      if (!this.visible) {
        this.visible = true;
        console.log('Dialog opened',this.visible);
    }
  }





  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // aquí iría la lógica para enviar la vacante
    }
  }

   handleLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo(): void {
    this.logoPreview = null;
  }
}
