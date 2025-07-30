import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EditProfileDialogComponent } from "../EditProfile/edit-profile-dialog-component";
import { LucideAngularModule, PlusCircleIcon } from 'lucide-angular';
import { ServicioGenericoComponent } from '../EditProfile/ServicioGenerico/servicio-generico.component';
import { MessageService } from 'primeng/api';
import { IProfileMilitar } from '../EditProfile/InterfaceProfile/IProfileMilitar';
import { DataResponse } from '../../Interface/Response';
import { IProfile } from '../../Interface/IProfile';

@Component({
  selector: 'app-profilecomponent',
  standalone: true,
  imports: [CommonModule, EditProfileDialogComponent, LucideAngularModule],
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

  /**
   *
   */
  constructor(private servicioGenerico: ServicioGenericoComponent,
    private messageService: MessageService
  ) {


  }
  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.perfilUsuario = JSON.parse(data);
      this.getPerfilAplicante(this.perfilUsuario?.id!);
    }
  }

  abrirEditor() {
    this.showEditDialog = !this.showEditDialog;
  }

  setTab(tab: string) {
    this.activeTab = tab;
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
}
