import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ArrowLeft, Calendar, MapPin, User, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, LucideAngularModule } from 'lucide-angular';

interface RecruiterMessage {
  date: string;
  message: string;
  type: 'info' | 'interview' | 'feedback' | 'decision';
}

interface RecruiterContact {
  name: string;
  email: string;
  phone?: string;
}

interface ApplicationDetailData {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  status: 'applied' | 'inReview' | 'interview' | 'rejected' | 'accepted';
  appliedDate: string;
  recruiterMessages: RecruiterMessage[];
  nextSteps?: string;
  interviewDate?: string;
  interviewLocation?: string;
  recruiterContact?: RecruiterContact;
}
@Component({
  selector: 'app-mensaje',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './mensaje.html',
  styleUrl: './mensaje.css'
})
export class Mensaje {
  ArrowLeft=ArrowLeft;
  Calendar=Calendar;
  MapPin=MapPin;
  User=User;
  MessageSquare=MessageSquare;
  Clock=Clock;
  CheckCircle=CheckCircle;
  XCircle=XCircle;
  AlertCircle=AlertCircle;
applicationData!: ApplicationDetailData;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '1';
    this.applicationData = {
      id,
      jobTitle: 'Especialista en Ciberseguridad',
      company: 'Dirección de Ciberseguridad C5i',
      location: 'Distrito Nacional, República Dominicana',
      status: 'interview',
      appliedDate: '15/05/2025',
      recruiterMessages: [
        {
          date: '16/05/2025',
          message: 'Hemos recibido su aplicación y está siendo revisada por nuestro equipo de recursos humanos.',
          type: 'info'
        },
        {
          date: '18/05/2025',
          message: 'Su perfil ha sido seleccionado para continuar en el proceso. Lo invitamos a una entrevista técnica.',
          type: 'interview'
        },
        {
          date: '20/05/2025',
          message: 'Por favor confirme su asistencia a la entrevista programada para el 22/05/2025 a las 10:00 AM.',
          type: 'interview'
        }
      ],
      nextSteps: 'Completar entrevista técnica y evaluación práctica de ciberseguridad',
      interviewDate: '22/05/2025 10:00 AM',
      interviewLocation: 'Edificio C5i, Sala de Conferencias 3, Piso 5',
      recruiterContact: {
        name: 'Lic. María González',
        email: 'maria.gonzalez@c5i.gob.do',
        phone: '(809) 555-0123'
      }
    };
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'applied': return 'lucide-clock';
      case 'inReview': return 'lucide-alert-circle';
      case 'interview': return 'lucide-calendar';
      case 'accepted': return 'lucide-check-circle';
      case 'rejected': return 'lucide-x-circle';
      default: return 'lucide-clock';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'interview': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'inReview': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusLabel(status: string): string {
    const map: any = {
      applied: 'Aplicado',
      inReview: 'En Revisión',
      interview: 'Entrevista',
      rejected: 'Rechazado',
      accepted: 'Aceptado'
    };
    return map[status] ?? status;
  }

  getMessageIcon(type: string): string {
    switch (type) {
      case 'interview': return 'lucide-calendar text-green-600';
      case 'feedback': return 'lucide-message-square text-blue-600';
      case 'decision': return 'lucide-check-circle text-purple-600';
      default: return 'lucide-alert-circle text-gray-600';
    }
  }
}
