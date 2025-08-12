import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ArrowLeft, Building, MapPin, Calendar, DollarSign, Users,
  Phone, Mail, LucideAngularModule, Briefcase, GraduationCap,
  ChevronDown, ChevronUp
} from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { Aplicaservices } from '../recruiter/ServicesRecruiter/aplicaservices';
import { IAplicacionVacante } from '../recruiter/InterfaceRecruiter/IAplicacionVacante';
import { ServicioGenericoComponent } from '../EditProfile/ServicioGenerico/servicio-generico.component';
import { IProfileMilitar } from '../EditProfile/InterfaceProfile/IProfileMilitar';
import { DataResponse } from '../../Interface/Response';
import { MessageService } from 'primeng/api';
import { AuthService, SessionInfo } from '../Auth/Services/auth-service'; // <-- exporta SessionInfo en tu servicio

@Component({
  selector: 'app-jobcard-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './job.card.detail.html',
  styleUrl: './job.card.detail.css',
  animations: [
    trigger('accordionAnimation', [
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class JobCardDetail implements OnInit {
  // estado de secciones
  showResponsibilities = false;
  showQualifications = false;
  showBenefits = false;

  // sesión/usuario
  isLogin = false;
  session: SessionInfo | null = null; // { userId, username, role, ... }

  // iconos
  Briefcase = Briefcase;
  GraduationCap = GraduationCap;
  DollarSign = DollarSign;
  Calendar = Calendar;
  Building = Building;
  MapPin = MapPin;
  Users = Users;
  ArrowLeft = ArrowLeft;
  Phone = Phone;
  Mail = Mail;
  ChevronDown = ChevronDown;
  ChevronUp = ChevronUp;

  @Input() dataVacante: IVacanteDto | null = null;

  private auth = inject(AuthService);

  constructor(
    private aplicaService: Aplicaservices,
    private perfilAplicante: ServicioGenericoComponent,
    private messageService: MessageService
  ) {}

ngOnInit(): void {
  // Observa estado de login y sesión
  this.auth.isLoggedIn$.subscribe((logged) => (this.isLogin = logged));
  this.auth.sessionInfo$.subscribe((s) => (this.session = s));

  // Verificación inicial
  this.auth.checkSession().subscribe();
}

  toggleSection(section: 'showResponsibilities' | 'showQualifications' | 'showBenefits') {
    this[section] = !this[section];
  }

  aplicar() {
    // Validar sesión y tener un userId numérico
    const userId = this.session?.userId ? Number(this.session.userId) : 0;
    if (!this.isLogin || !userId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Aviso',
        detail: 'Debes iniciar sesión para aplicar a la vacante',
      });
      return;
    }

    if (!this.dataVacante?.id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se encontró la vacante',
      });
      return;
    }

    // Obtener el perfil del aplicante por userId (para conseguir el ID de aplicante)
    this.perfilAplicante.GetAplicacion(userId).subscribe({
      next: (res: DataResponse<IProfileMilitar>) => {
        const aplicanteId = res?.data?.id;
        if (!res.success || !aplicanteId) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo obtener el perfil del aplicante',
          });
          return;
        }

        const payload: IAplicacionVacante = {
          aplicanteId,                 // number
          vacanteId: this.dataVacante!.id, // number
          estadoId: 1,
        };

        this.aplicaService.crearAplicacionVacante(payload).subscribe({
          next: (resp: DataResponse<boolean>) => {
            this.messageService.add({
              severity: resp.success ? 'success' : 'warn',
              summary: resp.success ? 'Aplicación exitosa' : 'Aviso',
              detail: resp.message,
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo crear la aplicación',
            });
          },
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener el perfil del aplicante',
        });
      },
    });
  }

  // helper para saber si ocultar el botón "Aplicar"
  get isAdmin(): boolean {
    return (this.session?.role ?? '').toLowerCase() === 'admin';
  }
}
