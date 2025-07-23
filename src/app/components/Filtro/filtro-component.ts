import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Filter, MapPin, Building, Briefcase } from 'lucide-angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-filtro',
  imports: [CommonModule, LucideAngularModule, FormsModule, ToastModule],
  templateUrl: './filtro-component.html',
  styleUrl: './filtro-component.css',
    providers: [MessageService],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class FiltroComponent {
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

  provincias = [
    { value: 'distrito-nacional', label: 'Distrito Nacional' },
    { value: 'santo-domingo', label: 'Santo Domingo' },
    { value: 'santiago', label: 'Santiago' },
    { value: 'la-altagracia', label: 'La Altagracia' },
    { value: 'la-vega', label: 'La Vega' },
    { value: 'puerto-plata', label: 'Puerto Plata' },
    { value: 'barahona', label: 'Barahona' },
    { value: 'san-juan', label: 'San Juan' },
    // ...continúa según tu lista
  ];

  instituciones = [
    { value: 'ejercito-rd', label: 'Ejército de República Dominicana' },
    { value: 'armada-rd', label: 'Armada de República Dominicana' },
    { value: 'fuerza-aerea-rd', label: 'Fuerza Aérea Dominicana' },
    { value: 'cesfront', label: 'CESFRONT' },
    // ...
  ];

  categorias = [
    { value: 'operaciones', label: 'Operaciones Especiales' },
    { value: 'inteligencia', label: 'Inteligencia y Contrainteligencia' },
    { value: 'ciberseguridad', label: 'Ciberseguridad' },
    { value: 'administracion', label: 'Administración' },
    { value: 'medicina-militar', label: 'Medicina Militar' },
    // ...
  ];



  resetFilters() {
    this.searchTerm = '';
    this.typeFilter = 'all';
    this.locationFilter = 'all';
    this.institutionFilter = 'all';
    this.positionFilter = 'all';
  }

  applyFilters() {
    console.log('Aplicando filtros...');
    // Aquí iría lógica para filtrar la lista de vacantes
  }
}
