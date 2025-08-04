import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { JobCardComponent } from '../vacanteCard/job-card';
import { CommonModule } from '@angular/common';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { VacanteServices } from '../Vacancies/ServicesVacantes/vacante-services';
import { MessageService } from 'primeng/api';
import { DataResponse } from '../../Interface/Response';
import { UserProfile } from '../Auth/login/InterfaceLogin/UserProfile';

@Component({
  selector: 'app-vacante-list',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './vacante-list.html',
  styleUrl: './vacante-list.css'
})
export class VacanteListComponent implements OnInit {
  @Input() filters: any;

  originalJobsData: IVacanteDto[] = [];
  jobsData: IVacanteDto[] = [];
  perfilUsuario:UserProfile={} as UserProfile;
constructor(
  private vacanteservice:VacanteServices,


) {}

  ngOnInit(): void {
  const data = localStorage.getItem('user');

    if (data) {
      this.perfilUsuario = JSON.parse(data);

    }
    this.consultarListaVacante();

  }
  ngOnChanges(changes: SimpleChanges) {
  if (changes['filters'] && this.originalJobsData.length > 0) {
    this.applyLocalFilter();
  }
}
private normalizeText(text: string): string {
  return text
    ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    : '';
}

 consultarListaVacante() {
    this.vacanteservice.getList().subscribe({
      next: (res: DataResponse<IVacanteDto[]>) => {
        if (res.success) {

              if (this.perfilUsuario.role=="Admin") {
                  this.originalJobsData = res.data.filter(a=>a.userId==this.perfilUsuario.id);

                this.jobsData = [...res.data.filter(a=>a.userId==this.perfilUsuario.id)];
              }
              else{
                 this.originalJobsData = res.data;

                this.jobsData = [...res.data];
              }

          this.applyLocalFilter(); // aplica si ya hay filtros
        }
      }
    });
  }
applyLocalFilter() {
  let data = [...this.originalJobsData];

  if (!this.filters) {
    this.jobsData = data;
    return;
  }

  // Normalizamos el search term
  const searchTerm = this.normalizeText(this.filters.search || '');

  // 🔹 Filtro por texto libre (título, institución, ubicación)
  if (searchTerm) {
    data = data.filter(job => {
      const titulo = this.normalizeText(job.titulo || '');
      const institucion = this.normalizeText(job.institucionNombre || '');
      const location = this.normalizeText(job.provinciaNombre || '');

      return titulo.includes(searchTerm) ||
             institucion.includes(searchTerm) ||
             location.includes(searchTerm);
    });
  }

  // 🔹 Tipo de contrato
  if (this.filters.type && this.filters.type !== 'all') {
    const typeFilter = this.normalizeText(this.filters.type);
    //data = data.filter(job => this.normalizeText(job.tipoContrato ==1?"Tiempo Completo":job.tipoContrato==2?"Medio Tiempo":job.tipoContrato==3?"Contrato":"Temporal" || '').includes(typeFilter));

 data = data.filter(job =>
  this.normalizeText(
    job.tipoContrato == 1 ? "Tiempo Completo" : job.tipoContrato==2 ? "Medio Tiempo" : job.tipoContrato==3 ? "Contrato" : "Temporal"
  ).toLowerCase().includes(typeFilter)
);
  }

  // 🔹 Provincia / Location
  if (this.filters.location && this.filters.location !== 'all') {
    const locationFilter = this.normalizeText(this.filters.location);
    data = data.filter(job => this.normalizeText(job.provinciaNombre || '').includes(locationFilter));
  }

  // 🔹 Institución
  if (this.filters.institution && this.filters.institution !== 'all') {
    const instFilter = this.normalizeText(this.filters.institution);
    data = data.filter(job => this.normalizeText(job.institucionNombre || '').includes(instFilter));
  }

  // 🔹 Categoría
  if (this.filters.category && this.filters.category !== 'all') {
    const catFilter = this.normalizeText(this.filters.category);
    data = data.filter(job => this.normalizeText(job.categoriaNombre || '').includes(catFilter));
  }

  this.jobsData = data;
}
}
