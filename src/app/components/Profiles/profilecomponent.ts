// src/app/components/Profiles/profilecomponent.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';
import { MessageService } from 'primeng/api';

import { EditProfileDialogComponent } from '../EditProfile/edit-profile-dialog-component';
import { SharedService } from '../GeneralServices/SharedService';
import { AuthService } from '../Auth/Services/auth-service';

import { IProfileMilitar } from '../EditProfile/InterfaceProfile/IProfileMilitar';
import { IAplicacionesDTO } from './InterfaceAplicaciones/IAplicacionesDTO';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { ProfileCacheService } from './ServiceProfile/profile-cache.service';


@Component({
  selector: 'app-profilecomponent',
  standalone: true,
  imports: [CommonModule, EditProfileDialogComponent, LucideAngularModule, RouterModule],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css'
})
export class Profilecomponent implements OnInit {
  activeTab: 'profile' | 'applications' | 'documents' | 'settings' = 'profile';
  showEditDialog = false;
  Plus = PlusCircleIcon;

  Aplicante: IProfileMilitar | null = null;
  listadoAplicaciones: IAplicacionesDTO[] = [];
  vacanteDetalle?: IVacanteDto;
  job?: IVacanteDto;

  private router = inject(Router);

  constructor(
    private messageService: MessageService,
    private shared: SharedService,
    private auth: AuthService,
    private profileCache: ProfileCacheService,
    ) {}

  ngOnInit(): void {
    // 1) Usar la sesión para obtener el userId
    this.auth.sessionInfo$.subscribe(session => {
      const userId = Number(session?.userId);
      if (!session?.isAuthenticated || Number.isNaN(userId)) return;


      // 2) Suscribirse a streams cacheados
      this.profileCache.getProfile(userId).subscribe(p => this.Aplicante = p);
      this.profileCache.getApplications(userId).subscribe(apps => this.listadoAplicaciones = apps);
    });

    // Verificación inicial de sesión (si no está ya poblada)
    this.auth.checkSession().subscribe();

    // Estado compartido de la vacante seleccionada
    this.shared.currentVacante.subscribe(v => {
      this.vacanteDetalle = v;
      this.job = v;
    });
  }

  abrirEditor() { this.showEditDialog = !this.showEditDialog; }
  setTab(tab: 'profile' | 'applications' | 'documents' | 'settings') { this.activeTab = tab; }
  goDetails() { this.router.navigate(['/jobs']); }

  // Cuando termines de editar en el modal, refresca el caché:
  onProfileSaved() {
    const userId = Number(this.auth.currentSession?.userId);
    if (!Number.isNaN(userId)) {
      this.profileCache.refreshProfile(userId);
      this.messageService.add({ severity: 'success', summary: 'Perfil', detail: 'Perfil actualizado' });
    }
  }

  // Si aplicas a una vacante, refresca solo la lista de aplicaciones:
  onApplied() {
    const userId = Number(this.auth.currentSession?.userId);
    if (!Number.isNaN(userId)) this.profileCache.refreshApplications(userId);
  }

  consultaVacantes(idVacante: number) {
    this.router.navigate(['/jobsdetails', idVacante]);
    this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Redirigiendo a detalles de la vacante...' });
  }

  descargarPdf(base64Pdf: string) {
    const link = document.createElement('a');
    link.href = base64Pdf;
    link.download = 'documento.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
