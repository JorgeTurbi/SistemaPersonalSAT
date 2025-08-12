import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core'; // CHANGED: quitado RESPONSE_INIT
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'; // CHANGED: usar DialogModule en lugar de Dialog (componente)
import { IInstitucionMilitar, IRango } from '../../Interface/IGenerico';
import { ServicioGenericoComponent } from './ServicioGenerico/servicio-generico.component';
import { DataResponse } from '../../Interface/Response';
import { IProfileMilitar } from './InterfaceProfile/IProfileMilitar';
import { IProfile } from '../../Interface/IProfile';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button'; // <-- añade esto

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DialogModule], // CHANGED
  templateUrl: './edit-profile-dialog-component.html',
  styleUrl: './edit-profile-dialog-component.css'
})
export class EditProfileDialogComponent implements OnInit {
  @Input() visible: boolean = false;

  form!: FormGroup;

  // Listas para selects
  rangos: IRango[] = [];
  rangosFiltrados: IRango[] = [];
  InstitucionMilitarList: IInstitucionMilitar[] = [];

  perfilUsuario?: IProfile;
  crearPerfilMilitar!: IProfileMilitar;
  Aplicante: IProfileMilitar = {} as IProfileMilitar;

  estadosCiviles: string[] = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];

  constructor(
    private fb: FormBuilder,
    private servicioGenerico: ServicioGenericoComponent,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('user');
    if (data) {
      this.perfilUsuario = JSON.parse(data);
    }

    this.getRangosList();
    this.getInstitucionList();

    this.form = this.fb.group({
      // Datos personales
      userId: [this.perfilUsuario?.id, Validators.required],
      profileImage: [''],
      name: ['', Validators.required],
      cedula: [''],
      birthDate: [''],
      country: [''],
      nationality: [''],
      maritalStatus: [''],
      phone: [''],
      email: ['', [Validators.email]],
      address: [''],
      institution: [''],
      rank: [''],
      specialization: [''],
      bio: [''],

      // Contacto de emergencia
      emergencyContact: [''],
      emergencyPhone: [''],

      // Habilidades
      skills: [''],

      // Arrays dinámicos (siempre inicializados como arrays vacíos)
      experience: this.fb.array([]), // CHANGED
      education: this.fb.array([])   // CHANGED
    });
  }

  SelectedInstitucion(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = Number(selectElement.value);
    this.rangosFiltrados = this.rangos.filter(a => a.institucionMilitarId === selectedValue);
    console.log(
      `Los rangos filtrados de ${
        this.InstitucionMilitarList.find(a => a.id == selectedValue)?.institucion
      } es ${this.rangosFiltrados}`
    );
  }

  getRangosList() {
    this.servicioGenerico.getRangos().subscribe({
      next: (res: DataResponse<IRango[]>) => {
        if (res.success) {
          this.rangos = res.data;
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  getInstitucionList() {
    this.servicioGenerico.getInstitucion().subscribe({
      next: (res: DataResponse<IInstitucionMilitar[]>) => {
        if (res.success) {
          this.InstitucionMilitarList = res.data;
        }
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  /** Getters para FormArray */
  get experience(): FormArray {
    return this.form.get('experience') as FormArray;
  }

  get education(): FormArray {
    return this.form.get('education') as FormArray;
  }

  /** Métodos para experiencia laboral */
  addExperience() {
    this.experience.push(
      this.fb.group({
        position: [''],
        company: [''],
        startDate: [''],
        endDate: [''],
        description: ['']
      })
    );
  }

  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  /** Métodos para educación */
  addEducation() {
    this.education.push(
      this.fb.group({
        degree: [''],
        institution: [''],
        startDate: [''],
        endDate: [''],
        certificatePdf: [''] // base64 opcional
      })
    );
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  handleEducationPdf(event: Event, index: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.education.at(index).patchValue({ certificatePdf: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  /** Imagen de perfil */
  handleImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.form.patchValue({ profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  /** Mostrar diálogo */
  showDialog() {
    this.visible = true;
  }

  /** Guardar */
  onSubmit() {
    if (!this.form.valid) {
      console.log('⚠️ Formulario inválido');
      return;
    }

    // CHANGED: tomamos el valor del form y garantizamos arrays definidos
    const v = this.form.value as any;

    const experienceArr = (v.experience ?? []) as Array<any>; // NEW: default []
    const educationArr = (v.education ?? []) as Array<any>;   // NEW: default []

    // CHANGED: construir el modelo fuerte con defaults seguros
    this.crearPerfilMilitar = {
      userId: v.userId,
      profileImage: v.profileImage ?? '',
      name: v.name,
      cedula: v.cedula ?? '',
      birthDate: v.birthDate ?? '',
      country: v.country ?? '',
      nationality: v.nationality ?? '',
      maritalStatus: v.maritalStatus ?? '',
      phone: v.phone ?? '',
      email: v.email ?? '',
      address: v.address ?? '',
      institution: Number(v.institution) || 0,
      rank: v.rank ?? '',
      specialization: v.specialization ?? '',
      bio: v.bio ?? '',
      emergencyContact: v.emergencyContact ?? '',
      emergencyPhone: v.emergencyPhone ?? '',
      skills: v.skills ?? '',

      // NEW: mapeo null-safe de arrays
      experience: experienceArr.map(e => ({
        ...e,
        startDate: e?.startDate ? new Date(e.startDate).toISOString() : undefined,
        endDate: e?.endDate ? new Date(e.endDate).toISOString() : undefined
      })),

      education: educationArr.map(e => ({
        ...e,
        startDate: e?.startDate ? new Date(e.startDate).toISOString() : undefined,
        endDate: e?.endDate ? new Date(e.endDate).toISOString() : undefined
      }))
    };

    this.servicioGenerico.createAplicacion(this.crearPerfilMilitar).subscribe({
      next: (res: DataResponse<boolean>) => {
        if (res.success) {
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: res.message });
          this.messageService.add({ severity: 'info', summary: 'Información', detail: 'Redirigiendo' });
          // si rediriges, hazlo aquí
        } else {
          this.messageService.add({ severity: 'warn', summary: 'Atención', detail: res.message });
        }
      },
      error: (err: any) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el perfil' });
      }
    });

    console.log('✅ Perfil actualizado:', this.crearPerfilMilitar);
    this.visible = false;
  }
}
