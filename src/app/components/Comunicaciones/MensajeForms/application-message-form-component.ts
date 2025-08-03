import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageSquare, Mail, Info, BadgeCheck, Calendar, Clock, MapPin, User, Phone, Send, LucideAngularModule } from 'lucide-angular';


export interface IRecruiterContact {
  name: string;        // Nombre del reclutador
  email: string;       // Correo de contacto
  phone?: string;      // Teléfono opcional
}

export interface IApplicationUpdate {
  status: 'applied' | 'inReview' | 'interview' | 'accepted' | 'rejected';
  interviewDate?: string;         // Fecha y hora de entrevista (ISO 8601)
  interviewLocation?: string;     // Lugar de entrevista
  recruiterContact: IRecruiterContact;
  newMessage: string;             // Mensaje que se envía al aplicante
  messageType: 'info' | 'interview' | 'feedback' | 'decision';
}


@Component({
  selector: 'app-application-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, LucideAngularModule],
  templateUrl: './application-message-form-component.html',
  styleUrl: './application-message-form-component.css'
})
export class ApplicationMessageFormComponent {
  MessageSquare=MessageSquare;
  Mail=Mail;
  Info=Info;
  BadgeCheck=BadgeCheck;
  Calendar=Calendar;
  Clock=Clock;
  MapPin=MapPin;
  User=User;
  Phone=Phone;
  Send=Send;
 @Output() submitUpdate = new EventEmitter<IApplicationUpdate>();

  applicationForm: FormGroup;

  statusOptions = [
    { label: 'Aplicado', value: 'applied' },
    { label: 'En Revisión', value: 'inReview' },
    { label: 'Entrevista', value: 'interview' },
    { label: 'Aceptado', value: 'accepted' },
    { label: 'Rechazado', value: 'rejected' }
  ];

  messageTypes = [
    { label: 'Información', value: 'info' },
    { label: 'Entrevista', value: 'interview' },
    { label: 'Feedback', value: 'feedback' },
    { label: 'Decisión', value: 'decision' }
  ];

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      status: ['applied', Validators.required],
      interviewDate: [''],
      interviewLocation: [''],
      recruiterName: ['', Validators.required],
      recruiterEmail: ['', [Validators.required, Validators.email]],
      recruiterPhone: [''],
      newMessage: ['', Validators.required],
      messageType: ['info', Validators.required]
    });
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      const formValue = this.applicationForm.value;
      const update: IApplicationUpdate = {
        status: formValue.status,
        interviewDate: formValue.interviewDate,
        interviewLocation: formValue.interviewLocation,
        recruiterContact: {
          name: formValue.recruiterName,
          email: formValue.recruiterEmail,
          phone: formValue.recruiterPhone
        },
        newMessage: formValue.newMessage,
        messageType: formValue.messageType
      };
      this.submitUpdate.emit(update);
      this.applicationForm.reset();
    }
  }
}
