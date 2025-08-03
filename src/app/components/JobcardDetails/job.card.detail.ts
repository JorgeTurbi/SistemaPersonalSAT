import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { RouterModule } from '@angular/router';
import { ArrowLeft, Building, MapPin, Calendar, DollarSign, Users, Phone, Mail, LucideAngularModule, Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { Aplicaservices } from '../recruiter/ServicesRecruiter/aplicaservices';
import { IProfile } from '../../Interface/IProfile';
import { IAplicacionVacante } from '../recruiter/InterfaceRecruiter/IAplicacionVacante';
import { ServicioGenericoComponent } from '../EditProfile/ServicioGenerico/servicio-generico.component';
import { IProfileMilitar } from '../EditProfile/InterfaceProfile/IProfileMilitar';
import { DataResponse } from '../../Interface/Response';
import { MessageService } from 'primeng/api';
import { IVacante } from '../Vacancies/InterfaceVacantes/ivacante';

@Component({
  selector: 'app-jobcard-detail',
  imports: [CommonModule, RouterModule, LucideAngularModule,],
  templateUrl: './job.card.detail.html',
  styleUrl: './job.card.detail.css',
  animations: [ // 👈 Asegúrate de incluir esto
    trigger('accordionAnimation', [
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class JobCardDetail implements OnInit {
  showResponsibilities = false;
  showQualifications = false;
  showBenefits = false;
  perfilUsuario!: IProfile;
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
  ChevronUp = ChevronUp
  @Input() dataVacante!: IVacanteDto;

  constructor(
    private aplicaService: Aplicaservices,
    private perfilAplicante: ServicioGenericoComponent,
    private messageService:MessageService
  ) {


  }
  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.perfilUsuario = JSON.parse(data);

    }
  }

  toggleSection(section: 'showResponsibilities' | 'showQualifications' | 'showBenefits') {
    this[section] = !this[section];
  }
aplicar() {
  if (this.perfilUsuario.id > 0) {
    this.perfilAplicante.GetAplicacion(this.perfilUsuario.id).subscribe({
      next: (res: DataResponse<IProfileMilitar>) => {
        if (res.success && res.data) {
          const datos: IAplicacionVacante = {
            aplicanteId: res.data.id,
            vacanteId: this.dataVacante?.id,
            estadoId: 1
          } as IAplicacionVacante;
            this.SendDatos(datos);

        }
        return;
      },
      error: (err: any) => {
        console.error('Error al obtener perfil del aplicante:', err);
        this.messageService.add({
          severity: 'error',
          summary: "Error",
          detail: "No se pudo obtener el perfil del aplicante"
        });
      }
    });
  } else {
    this.messageService.add({
      severity: 'warn',
      summary: "Aviso",
      detail: "Debes iniciar sesión para aplicar a la vacante"
    });
  }
}


SendDatos(dato:IAplicacionVacante)
{
      this.aplicaService.crearAplicacionVacante(dato).subscribe({
            next: (resp: DataResponse<Boolean>) => {
              if (resp.success) {
                this.messageService.add({
                  severity: 'success',
                  summary: "Aplicación exitosa",
                  detail: resp.message
                });
       ;
              } else {
                this.messageService.add({
                  severity: 'warn',
                  summary: "Aviso",
                  detail: resp.message
                });
              }
            },
            error: (err: any) => {
              console.error('Error al crear aplicación:', err);
              this.messageService.add({
                severity: 'error',
                summary: "Error",
                detail: "No se pudo crear la aplicación"
              });
            }
          });
        }


}


