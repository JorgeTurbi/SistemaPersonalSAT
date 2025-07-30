import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Filter, MapPin, Building, Briefcase } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IProvincia } from '../../Interface/IProvincia';
import { ServiciosGenerales } from '../GeneralServices/servicios-generales';
import { DataResponse } from '../../Interface/Response';
import { InstitucionService } from '../Services/institucion-service';
import { IInstitucion } from '../../Interface/IInstitucion';
import { IDEPARTAMENTO } from '../../Interface/IDepartamento';

@Component({
  selector: 'app-filtro',
  imports: [CommonModule, LucideAngularModule, FormsModule, ToastModule],
  templateUrl: './filtro-component.html',
  styleUrl: './filtro-component.css',
    providers: [MessageService],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class FiltroComponent implements OnInit {
  // Icons
  searchIcon = Search;
  filterIcon = Filter;
  locationIcon = MapPin;
  companyIcon = Building;
  Briefcase = Briefcase;
  MapPin = MapPin;
  Building = Building;

 Filter = Filter;
  Search = Search;

  searchTerm = '';
  typeFilter = 'all';
  locationFilter = 'all';
  institutionFilter = 'all';
  positionFilter = 'all';
  provincias:IProvincia[]=[];
@Output() filtersChanged = new EventEmitter<any>();

  instituciones:IInstitucion[] = [];

  categorias:IDEPARTAMENTO[] = [];

  /**
   *
   */
  constructor(private servicioGenerales:ServiciosGenerales,
    private serviceInstitucions:InstitucionService
  ) {


  }
ngOnInit():void{
 this.servicioGenerales.getProvincias().subscribe({
  next:(res:DataResponse<IProvincia[]>)=>{
    if (res.success) {
       this.provincias=res.data;
    }

  },
  error:(err:any)=>{
    console.error(err);
  }
 });
 this.serviceInstitucions.getInstituciones().subscribe({
 next:(res:DataResponse<IInstitucion[]>)=>{
    if (res.success) {
       this.instituciones=res.data;
    }

  },
  error:(err:any)=>{
    console.error(err);
  }
 });

 this.serviceInstitucions.getDepartmentos().subscribe({
   next:(res:DataResponse<IDEPARTAMENTO[]>)=>{
    if (res.success) {
       this.categorias=res.data;
    }

  },
  error:(err:any)=>{
    console.error(err);
  }
 });
}


  applyFilters() {
    this.filtersChanged.emit({
      search: this.searchTerm.toLowerCase(),
      type: this.typeFilter,
      location: this.locationFilter,
      institution: this.institutionFilter,
      category: this.positionFilter
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.typeFilter = 'all';
    this.locationFilter = 'all';
    this.institutionFilter = 'all';
    this.positionFilter = 'all';
    this.applyFilters(); // Emite para resetear la lista
  }


    // Emitimos cada vez que cambia algo
  emitFilters() {
    this.filtersChanged.emit({
      search: this.searchTerm,
      type: this.typeFilter,
      location: this.locationFilter,
      institution: this.institutionFilter,
      category: this.positionFilter
    });
  }
}
