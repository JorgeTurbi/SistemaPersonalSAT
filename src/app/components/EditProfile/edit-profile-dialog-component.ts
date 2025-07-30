import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, RESPONSE_INIT } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { IInstitucionMilitar, IRango } from '../../Interface/IGenerico';
import { ServicioGenericoComponent } from './ServicioGenerico/servicio-generico.component';
import { DataResponse } from '../../Interface/Response';
import { IProfileMilitar } from './InterfaceProfile/IProfileMilitar';
import { IProfile } from '../../Interface/IProfile';
import { MessageService } from 'primeng/api';
;

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, Dialog],
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
crearPerfilMilitar!:IProfileMilitar;
Aplicante:IProfileMilitar={} as IProfileMilitar;

  estadosCiviles: string[] = ['Soltero', 'Casado', 'Divorciado', 'Viudo'];

  constructor(
    private fb: FormBuilder,
    private servicioGenerico: ServicioGenericoComponent,
    private messageService:MessageService

  ) { }

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
      // Arrays dinámicos
      experience: this.fb.array([]),
      education: this.fb.array([])
    });
  }


  SelectedInstitucion(event:Event)
  {
     const selectElement = event.target as HTMLSelectElement;
  const selectedValue = Number(selectElement.value);
     this.rangosFiltrados = this.rangos.filter(a=>a.institucionMilitarId===selectedValue);
    console.log(`Los rangos filtrados de ${this.InstitucionMilitarList.find(a=>a.id==selectedValue)?.institucion} es ${this.rangosFiltrados}`)

  }

  getRangosList() {
    this.servicioGenerico.getRangos().subscribe({
      next: (res: DataResponse<IRango[]>) => {
        if (res.success) {
          this.rangos = res.data;
        }

        return;
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

        return;
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
    this.experience.push(this.fb.group({
      position: [''],
      company: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    }));

  }


  buscarPorCedula() {
    const cedula = this.form.get('cedula')?.value;
    if (!cedula) {
      console.log('⚠️ Ingrese una cédula para buscar');
      return;
    }

    // Aquí puedes hacer la llamada al servicio
    console.log('🔎 Buscando información para cédula:', cedula);

    // Ejemplo: this.miServicio.buscarCedula(cedula).subscribe(...)
  }
  removeExperience(index: number) {
    this.experience.removeAt(index);
  }

  /** Métodos para educación */
  addEducation() {
    this.education.push(this.fb.group({
      degree: [''],
      institution: [''],
      startDate: [''],
      endDate: [''],
      certificatePdf: [''] // base64 opcional
    }));

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
    if (this.form.valid) {
      console.log('✅ Perfil:', this.form.value);
      this.crearPerfilMilitar=this.form.value;

      this.crearPerfilMilitar.experience = this.crearPerfilMilitar.experience.map(e => ({
  ...e,
  startDate: e.startDate ? new Date(e.startDate).toISOString() : undefined,
  endDate: e.endDate ? new Date(e.endDate).toISOString() : undefined
}));

this.crearPerfilMilitar.education = this.crearPerfilMilitar.education.map(e => ({
  ...e,
  startDate: e.startDate ? new Date(e.startDate).toISOString() : undefined,
  endDate: e.endDate ? new Date(e.endDate).toISOString() : undefined
}));

            this.servicioGenerico.createAplicacion(this.crearPerfilMilitar).subscribe({
              next:(res:DataResponse<boolean>)=>{
                if(res.success)
                {

          this.messageService.add({ severity: 'success', summary: "Login Exitoso", detail: res.message });
          this.messageService.add({ severity: 'info', summary: "Information", detail: "Redirigiendo" });
                }
              },
            error:(err:any)=>{
              console.log(err)
            }
            });
           console.log('✅ Perfil actualizado:', this.crearPerfilMilitar);
      this.visible = false;
    } else {
      console.log('⚠️ Formulario inválido');
    }
  }
}
