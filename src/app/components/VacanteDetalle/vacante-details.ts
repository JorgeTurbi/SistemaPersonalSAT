import { Component, inject, Input, OnInit } from '@angular/core';
import { ArrowLeft, LucideAngularModule } from "lucide-angular";
import { JobCardDetail } from '../JobcardDetails/job.card.detail';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedService } from '../GeneralServices/SharedService';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { VacanteServices } from '../Vacancies/ServicesVacantes/vacante-services';
import { DataResponse } from '../../Interface/Response';

@Component({
  selector: 'app-vacante-details',
  imports: [ LucideAngularModule,JobCardDetail,RouterModule, CommonModule],
  templateUrl: './vacante-details.html',
  styleUrl: './vacante-details.css'
})
export class VacanteDetails implements OnInit {
  ArrowLeft=ArrowLeft;
@Input() jobId: string = '';
    router =inject(Router)
  job: IVacanteDto = {} as IVacanteDto;

    vacanteDetalle!:IVacanteDto;

    constructor(private shared: SharedService,
       private route: ActivatedRoute,
       private vacanteService:VacanteServices
    ) {}

    ngOnInit():void{
        // this.shared.currentVacante.subscribe(datos=>this.vacanteDetalle=datos);
        // this.job=this.vacanteDetalle;
        // Intentar primero cargar del SharedService
    // this.shared.currentVacante.subscribe(datos => {
    //   if (datos) {
    //     this.job = datos;
    //   }
    // });

    // Si no viene por shared, usar el parámetro de la URL
    // this.route.paramMap.subscribe(params => {
    //   const id = Number(params.get('id'));
    //   if (id && !this.job) {
    //     this.vacanteService.getVacatebyId(id).subscribe({
    //       next: (res:DataResponse<IVacanteDto>) => { if(res.success) this.job = res.data; },
    //       error: (err:any) => console.error('Error cargando vacante:', err)
    //     });
    //   }
    // });

    // 1️⃣ Intentamos obtener del servicio compartido
    // this.shared.currentVacante.subscribe(datos => {
    //   if (datos && datos.id) {
    //     this.job = datos;
    //   }
    // });

    // 2️⃣ Si no hay datos (ej: al refrescar página), tomamos el ID de la URL
    const jobId:number = Number(this.route.snapshot.paramMap.get('id'));
    if (jobId) {
      this.vacanteService.getVacatebyId(jobId).subscribe({
          next: (res:DataResponse<IVacanteDto>) => { if(res.success) this.job = res.data; },
          error: (err:any) => console.error('Error cargando vacante:', err)
        });
    }
  }



  goDetails()
  {
   this.shared.changeMessage(this.job);

  // Navega con el ID como parámetro
  this.router.navigate(['/jobs']);
  }
}
