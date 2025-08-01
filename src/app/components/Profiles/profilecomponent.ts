import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EditProfileDialogComponent } from "../EditProfile/edit-profile-dialog-component";
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';
import { ServicioGenericoComponent } from '../EditProfile/ServicioGenerico/servicio-generico.component';
import { MessageService } from 'primeng/api';
import { IProfileMilitar } from '../EditProfile/InterfaceProfile/IProfileMilitar';
import { DataResponse } from '../../Interface/Response';
import { IProfile } from '../../Interface/IProfile';
import { IAplicacionesDTO } from './InterfaceAplicaciones/IAplicacionesDTO';
import { VacanteServices } from '../Vacancies/ServicesVacantes/vacante-services';
import { SharedService } from '../GeneralServices/SharedService';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { Router, RouterModule } from '@angular/router';
import { AplicanteProfileService } from './ServiceProfile/aplicante-profile-service';

@Component({
  selector: 'app-profilecomponent',
  standalone: true,
  imports: [CommonModule, EditProfileDialogComponent, LucideAngularModule,RouterModule],
  templateUrl: './profilecomponent.html',
  styleUrl: './profilecomponent.css'
})

export class Profilecomponent implements OnInit {
  activeTab = 'profile';
  showEditDialog = false;
  Plus = PlusCircleIcon;
  perfilUsuario?: IProfile;
  crearPerfilMilitar!: IProfileMilitar;
  Aplicante: IProfileMilitar = {} as IProfileMilitar;
  listadoAplicaciones:IAplicacionesDTO[]=[];
  vacanteDetalle!:IVacanteDto;
   job :IVacanteDto={} as IVacanteDto;
   jobList: IVacanteDto[]=[];
    router =inject(Router)

  /**
   *
   */
  constructor(private servicioGenerico: ServicioGenericoComponent,
    private messageService: MessageService,
    private shared:SharedService,
    private aplicanteProfileService: AplicanteProfileService

  ) {


  }
  ngOnInit(): void {

    const data = sessionStorage.getItem('user');
    if (data) {
      this.perfilUsuario = JSON.parse(data);
     // this.getPerfilAplicante(this.perfilUsuario?.id!);
    }
    this.aplicanteProfileService.aplicanteProfile$.subscribe(profile => {
    if (profile) {

      this.Aplicante= profile;
    }
  });
    this.getAllAplicaciones();
      this.shared.currentVacante.subscribe(datos=>this.vacanteDetalle=datos);
        this.job=this.vacanteDetalle;
  }

  abrirEditor() {
    this.showEditDialog = !this.showEditDialog;
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
    goDetails()
  {
    this.router.navigate(['/jobs']);
  }
verDetalles(dataVancante:IVacanteDto)
{
  this.shared.changeMessage(dataVancante);
              this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Regidiriengo...' });

  this.router.navigate(['/jobsdetails']);
}

consultaVacantes(idVacante:number)
{


    this.router.navigate(['/jobsdetails', idVacante]);

  this.messageService.add({
    severity: 'info',
    summary: 'Información',
    detail: 'Redirigiendo a detalles de la vacante...'
  })
}
  getPerfilAplicante(iduser: number) {
    this.servicioGenerico.GetAplicacion(iduser).subscribe({
      //inicio
      next: (res: DataResponse<IProfileMilitar>) => {
        if (res.success) {
          this.Aplicante = res.data;
          console.log(`===> ${this.Aplicante.cedula}`);

          this.messageService.add({ severity: 'success', summary: "Perfil", detail: res.message });

        }
      },
      error: (err: any) => {
        console.log(err)
      }
      //fin

    });
  }

  descargarPdf(base64Pdf: string) {


    // Crear un enlace temporal para forzar la descarga
    const link = document.createElement('a');
    link.href = base64Pdf;
    link.download = 'documento.pdf'; // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getAllAplicaciones()
  {
      this.servicioGenerico.getAplicaionesbyUserId(this.perfilUsuario?.id!).subscribe({
        next:(res:DataResponse<IAplicacionesDTO[]>)=>{
          if (res.success) {
            this.listadoAplicaciones=res.data;
            this.messageService.add({ severity: 'success', summary: "Perfil", detail: res.message });
          }
          return;

        },
        error:(err:any)=>{
          console.error(err);
        }
      })
  }
}
