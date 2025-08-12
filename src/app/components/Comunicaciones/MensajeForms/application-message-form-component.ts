import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MessageSquare, Mail, Info, BadgeCheck, Calendar, Clock, MapPin,
  User, Phone, Send, LucideAngularModule
} from 'lucide-angular';

export interface IRecruiterContact {
  name: string;
  email: string;
  phone?: string;
}

export interface IApplicationUpdate {
  status: 'applied' | 'inReview' | 'interview' | 'accepted' | 'rejected';
  /** ISO 8601 combinando fecha+hora si están disponibles */
  interviewDate?: string;
  interviewLocation?: string;
  recruiterContact: IRecruiterContact;
  newMessage: string;
  messageType: 'info' | 'interview' | 'feedback' | 'decision';
}

@Component({
  selector: 'app-application-message-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './application-message-form-component.html',
  styleUrl: './application-message-form-component.css'
})
export class ApplicationMessageFormComponent {
  // Iconos
  MessageSquare = MessageSquare;
  Mail = Mail;
  Info = Info;
  BadgeCheck = BadgeCheck;
  Calendar = Calendar;
  Clock = Clock;
  MapPin = MapPin;
  User = User;
  Phone = Phone;
  Send = Send;
applicationForm!: FormGroup;

  @Output() submitUpdate = new EventEmitter<IApplicationUpdate>();


  constructor(private fb: FormBuilder) {
    // cuando el estado sea "interview", volvemos obligatorios los campos de entrevista
    this.applicationForm.get('status')!.valueChanges.subscribe((st: string) => {
      const require = st === 'interview';

      this.toggleRequired('interviewDate', require);
      this.toggleRequired('interviewTime', require);
      this.toggleRequired('interviewLocation', require);
    });
  }

  private toggleRequired(controlName: string, required: boolean) {
    const ctrl = this.applicationForm.get(controlName);
    if (!ctrl) return;

    if (required) {
      ctrl.addValidators(Validators.required);
    } else {
      ctrl.removeValidators(Validators.required);
    }
    ctrl.updateValueAndValidity({ emitEvent: false });
  }

  onSubmit() {
      this.applicationForm = this.fb.group({
    // básicos
    newMessage: ['', Validators.required],
    messageType: ['info', Validators.required],
    status: ['applied', Validators.required],

    // entrevista
    interviewDate: [''],
    interviewTime: [''],             // <-- agregado (faltaba)
    interviewLocation: [''],

    // reclutador
    recruiterName: ['', Validators.required],
    recruiterEmail: ['', [Validators.required, Validators.email]],
    recruiterPhone: [''],
  });

    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    const v = this.applicationForm.value;

    // Combinar fecha + hora a ISO si existen ambos
    let interviewISO: string | undefined;
    if (v.interviewDate && v.interviewTime) {
      // construimos un string ISO local (sin timezone)
      interviewISO = `${v.interviewDate}T${v.interviewTime}:00`;
    }

    const update: IApplicationUpdate = {
      status: v.status,
      interviewDate: interviewISO,             // guardado como ISO combinado
      interviewLocation: v.interviewLocation || undefined,
      recruiterContact: {
        name: v.recruiterName,
        email: v.recruiterEmail,
        phone: v.recruiterPhone || undefined
      },
      newMessage: v.newMessage,
      messageType: v.messageType
    };

    this.submitUpdate.emit(update);

    // Reset manteniendo valores por defecto razonables
    this.applicationForm.reset({
      newMessage: '',
      messageType: 'info',
      status: 'applied',
      interviewDate: '',
      interviewTime: '',
      interviewLocation: '',
      recruiterName: '',
      recruiterEmail: '',
      recruiterPhone: ''
    });
  }
}
