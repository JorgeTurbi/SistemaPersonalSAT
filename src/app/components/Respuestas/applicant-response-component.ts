import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Reply, MessageSquare, CheckCircle, Calendar, Clock, Paperclip, Send } from 'lucide-angular';

@Component({
  selector: 'app-applicant-response',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './applicant-response-component.html',
  styleUrl: './applicant-response-component.css'
})
export class ApplicantResponseComponent {
// Íconos de lucide-angular
  Reply = Reply;
  MessageSquare = MessageSquare;
  CheckCircle = CheckCircle;
  Calendar = Calendar;
  Clock = Clock;
  Paperclip = Paperclip;
  Send = Send;

  responseForm: FormGroup;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.responseForm = this.fb.group({
      message: ['', Validators.required],
      responseType: ['confirm', Validators.required],
      proposedDate: [''],
      proposedTime: [''],
      attachments: [null]
    });
  }

  /**
   * Maneja la selección de archivos
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.responseForm.patchValue({ attachments: this.selectedFiles });
    }
  }

  /**
   * Envía la respuesta al reclutador
   */
  onSubmit(): void {
    if (this.responseForm.invalid) {
      this.responseForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('message', this.responseForm.value.message);
    formData.append('responseType', this.responseForm.value.responseType);

    if (this.responseForm.value.proposedDate) {
      formData.append('proposedDate', this.responseForm.value.proposedDate);
    }
    if (this.responseForm.value.proposedTime) {
      formData.append('proposedTime', this.responseForm.value.proposedTime);
    }

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach(file => {
        formData.append('attachments', file, file.name);
      });
    }

    // Aquí harías tu petición HTTP al backend
    console.log('Formulario enviado:', this.responseForm.value);
    alert('¡Respuesta enviada con éxito!');
  }
}
