
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, Search, Filter, MapPin, Building, Briefcase } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FiltroComponent } from "../Filtro/filtro-component";
import { VacanteListComponent } from '../VacancyList/vacante-list';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { ITipoContrato, IVacante } from './InterfaceVacantes/ivacante';
import { VacanteServices } from './ServicesVacantes/vacante-services';
import { ICategoriaVacante } from './InterfaceVacantes/ICateogriaVacante';
import { DataResponse } from '../../Interface/Response';
import { ServiciosGenerales } from '../GeneralServices/servicios-generales';
import { IProvincia } from '../../Interface/IProvincia';
import { InstitucionService } from '../Services/institucion-service';
import { IInstitucion } from '../../Interface/IInstitucion';
import { IProfile } from '../../Interface/IProfile';


@Component({
  selector: 'app-vacante',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, ReactiveFormsModule, ToastModule, FiltroComponent, VacanteListComponent, Dialog, ButtonModule, StyleClassModule],
  templateUrl: './vacante.component.html',
  styleUrl: './vacante.component.css',
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class VacanteComponent implements OnInit {
  // variables
  Briefcase = Briefcase;
  vacanteForm!: FormGroup;
  logoPreview: string | null = null;
  isCreateJobOpen = false;
  visible: boolean = false;
  vacanteCategoriaList: ICategoriaVacante[] = [];
  tipoContratoOpciones: { label: string; value: number }[] = [];
  provinciaList: IProvincia[] = [];
  institutions: IInstitucion[] = [];
  selectedInstitution: string = '';
  perfilUsuario?: IProfile;
  createVacante!: IVacante;
    currentFilters: any = {};
  //constructor
  constructor(
    private fb: FormBuilder,
    private vacanteService: VacanteServices,
    private messageService: MessageService,
    private servicioGeneral: ServiciosGenerales,
    private institucionService: InstitucionService

  ) { }
  ngOnInit(): void {
    this.getCategorias();
    this.cargarTipoContrato();
    this.provincias();
    this.getListInstitucion();
    const data = sessionStorage.getItem('user');
    if (data) {
      this.perfilUsuario = JSON.parse(data);

    }
    // inicializacion del formulario
    this.vacanteForm = this.fb.group({
      userId: [this.perfilUsuario?.id, Validators.required],
      institucionId: [this.perfilUsuario?.id, Validators.required],
      provinciaId: [null, Validators.required],
      categoriaId: [null, Validators.required],
      titulo: ['', Validators.required],
      tipoContrato: [ITipoContrato.TiempoCompleto, Validators.required],
      salarioCompensacion: ['', Validators.required],
      fechaLimiteAplicacion: ['', Validators.required],
      horarioTrabajo: ['', Validators.required],
      duracionContrato: ['', Validators.required],
      descripcionPuesto: ['', Validators.required],
      requisitosGenerales: ['', Validators.required],
      responsabilidadesEspecificas: ['', Validators.required],
      educacionRequerida: ['', Validators.required],
      experienciaRequerida: ['', Validators.required],
      habilidadesCompetencias: ['', Validators.required],
      beneficiosCompensaciones: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      isActive: [true, Validators.required]
    });

  }

onFiltersChanged(filters: any) {
  this.currentFilters = filters;
}
  getListInstitucion(): void {

    this.institucionService.getInstituciones().subscribe({
      next: (response: DataResponse<IInstitucion[]>) => {
        if (response.success && response.data) {
          this.institutions = response.data.filter(i => i.id == 12);
          if (this.institutions.length > 0) {
            this.selectedInstitution = this.institutions[0].id?.toString()!;
          }
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No se encontraron instituciones' });
        }
      },
      error: (err) => {
        const msg = err?.error?.message || 'Error al obtener instituciones';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
        console.error('Error fetching institutions:', err);
      }
    });
  }

  cargarTipoContrato(): void {
    const enumObj = ITipoContrato;
    this.tipoContratoOpciones = Object.keys(enumObj)
      .filter(key => isNaN(Number(key))) // solo claves string
      .map(key => ({
        label: this.humanizar(key),
        value: enumObj[key as keyof typeof ITipoContrato]
      }));
  }

  private humanizar(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1 $2'); // Ej: TiempoCompleto -> Tiempo Completo
  }

  showDialog() {
    if (!this.visible) {
      this.visible = true;
      console.log('Dialog opened', this.visible);
    }
  }

  onSubmit(): void {
    console.log("===>",this.vacanteForm.value);
    if (this.vacanteForm.invalid) {
      this.vacanteForm.markAllAsTouched();
      return;

    }
    if (this.vacanteForm.valid) {
        console.log("===>+++",this.vacanteForm.value);

const formValue:IVacante = this.vacanteForm.value;

  const payload: IVacante = {
    userId: Number(formValue.userId),
    institucionId: Number(formValue.institucionId),
    provinciaId: Number(formValue.provinciaId),
    categoriaId: Number(formValue.categoriaId),
    titulo: formValue.titulo,
    tipoContrato: Number(formValue.tipoContrato) as ITipoContrato,
    salarioCompensacion: formValue.salarioCompensacion,
    fechaLimiteAplicacion: formValue.fechaLimiteAplicacion
      ? new Date(formValue.fechaLimiteAplicacion).toISOString()
      : undefined,
    horarioTrabajo: formValue.horarioTrabajo,
    duracionContrato: formValue.duracionContrato,
    descripcionPuesto: formValue.descripcionPuesto,
    requisitosGenerales: formValue.requisitosGenerales,
    responsabilidadesEspecificas: formValue.responsabilidadesEspecificas,
    educacionRequerida: formValue.educacionRequerida,
    experienciaRequerida: formValue.experienciaRequerida,
    habilidadesCompetencias: formValue.habilidadesCompetencias,
    beneficiosCompensaciones: formValue.beneficiosCompensaciones,
    telefono: formValue.telefono,
    email: formValue.email,
    direccion: formValue.direccion,
    isActive: formValue.isActive
  };




      // aquí iría la lógica para enviar la vacante
      this.vacanteService.newVacante(payload).subscribe({
        next: (res: DataResponse<boolean>) => {
          if (res.success) {

            return this.messageService.add({ severity: 'success', summary: "Nueva Vacante", detail: res.message });

          }
          if (!res.success) {

            return this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
          }

        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }

  }

  handleLogoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  provincias(): void {
    this.servicioGeneral.getProvincias().subscribe({
      next: (res: DataResponse<IProvincia[]>) => {
        if (res.success) {
          this.provinciaList = res.data;
          this.messageService.add({ severity: 'info', summary: "Information", detail: "Obteniendo Provincias" });

        }
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: "No se Encontraron Registros" });

      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  getCategorias() {
    this.vacanteService.getCategoriesVacante().subscribe({
      next: (res: DataResponse<ICategoriaVacante[]>) => {
        if (res.success) {
          this.vacanteCategoriaList = res.data;
          this.messageService.add({ severity: 'info', summary: "Information", detail: "Obteniendo Categorias Vacantes" });

        }
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: "No se Encontraron Registros" });

      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error de autenticación' });

      }
    });
  }


  removeLogo(): void {
    this.logoPreview = null;
  }
}
