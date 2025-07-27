import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, X, Upload, Search, Eye, EyeOff } from 'lucide-angular';
import { NgxMaskDirective } from 'ngx-mask';
import { IInstitucion } from '../../../Interface/IInstitucion';
import { InstitucionService } from '../../Services/institucion-service';
import { DataResponse } from '../../../Interface/Response';
import { IDEPARTAMENTO } from '../../../Interface/IDepartamento';
import { MessageService } from 'primeng/api';
import { passwordMatchValidator } from './passwordMatchValidator';
import { ServiciosGenerales } from '../../GeneralServices/servicios-generales';
import { IUserDataService } from '../../../Interface/IUserDataService';
import { IResponseTokenDataService } from './InterfaceRegister/ResponseTokenDataService';
import { ConsultaJceResponse } from '../../../Interface/ConsultaJceResponse';

@Component({
  selector: 'app-registerform',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule, RouterModule, NgxMaskDirective],

  templateUrl: './register-form-component.html',
  styleUrl: './register-form-component.css'
})
export class RegisterFormComponent implements OnInit {

  institutions: IInstitucion[] = [];
  logoPreview: string = '';
  X = X;
  Upload = Upload;

  Search = Search;
  Eye = Eye;
  EyeOff = EyeOff;

  selectedInstitution: string = '';
  selectedInstitutionLogo: string = '';
  departamentos: IDEPARTAMENTO[] = [];
  registerForm!: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private serviceGeneral: ServiciosGenerales,
    private router: Router, private _InstitucionService: InstitucionService, private fb: FormBuilder, private messageService: MessageService) { }
  ngOnInit(): void {

    this.getToken();
    this.getInstitutions();
    this.getdepartamentos();
    this.registerForm = this.fb.group({
      userType: ['P', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{7}-\d{1}$/)]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      institution: [null, Validators.required],
      departamento: [null, Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]]

    },
      {
        validators: passwordMatchValidator('password', 'confirmPassword')
      }
    );

    // 👉 Escucha cambios y actualiza fullName automáticamente
    this.registerForm.get('nombres')?.valueChanges.subscribe(() => {
      this.updateFullName();
    });

    this.registerForm.get('apellidos')?.valueChanges.subscribe(() => {
      this.updateFullName();
    });

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updateFullName(): void {
    const nombres = this.registerForm.get('nombres')?.value || '';
    const apellidos = this.registerForm.get('apellidos')?.value || '';
    const fullName = `${nombres} ${apellidos}`.trim();

    this.registerForm.get('fullName')?.setValue(fullName, { emitEvent: false });
  }
  getdepartamentos() {
    this._InstitucionService.getDepartmentos().subscribe({
      next: (response: DataResponse<IDEPARTAMENTO[]>) => {
        if (response.success) {
          this.departamentos = response.data;
        }
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      }
    });
  }
  getToken() {
    const userData: IUserDataService = { username: 'jturbi', password: 'Brittany040238.' }
    this.serviceGeneral.getTokendATA(userData).subscribe({
      next: (res: IResponseTokenDataService) => {
        if (res.token != null || res.token != undefined) {
          localStorage.setItem('dataToken', res.token);
        }
      },
      error: (err: any) => {
        console.error(err)
      }

    });
  }
  getInstitutions() {
    this._InstitucionService.getInstituciones().subscribe({
      next: (response: DataResponse<IInstitucion[]>) => {
        if (response.success) {
          this.institutions = response.data.filter(i => i.id == 12);
          if (this.institutions.length > 0) {
            this.selectedInstitution = this.institutions[0].id?.toString()!;
            this.selectedInstitutionLogo = this.institutions[0].urlLogo;
          }

        }
      },
      error: (error) => {
        console.error('Error fetching institutions:', error);
      }
    });
  }

  onInstitutionChange() {
    const inst = this.institutions.find(i => i.id?.toString() === this.selectedInstitution);
    this.selectedInstitutionLogo = inst?.urlLogo ?? '';
  }


  buscarCedula() {
    const cedula:string = this.registerForm.get("cedula")?.value;
    if(cedula==null || cedula== undefined)
    {
   this.messageService.add({ severity: 'info', summary: 'Information', detail:  'Digite su numero de cédula' });
    }
    console.log('Buscando información para la cédula:', cedula);
    const token = localStorage.getItem("dataToken");
    if (token != null) {
      this.serviceGeneral.getUserData(cedula).subscribe({
        next: (res: ConsultaJceResponse) => {
          if (res.nombres != null || res.nombres != undefined) {
            this.registerForm.patchValue({

              cedula: res.cedula,
              nombres: res.nombres,
              apellidos: res.apellido1 + " " + res.apellido2,
              fullName: res.nombres + "  " + res.apellido1 + " " + res.apellido2
            });
          }
        },
        error: (err: any) => {
          console.log("mierror==>",err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error?.message || 'Error de autenticación' });
        }
      });
    }
    // Aquí puedes agregar lógica para buscar los datos del usuario por cédula
  }


  submitForm() {
    if (this.registerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las contraseñas no coinciden.' });
      this.registerForm.markAllAsTouched();
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);
  }
}
