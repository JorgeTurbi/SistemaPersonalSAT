import { Component } from '@angular/core';
import { JobCardComponent } from '../vacanteCard/job-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacante-list',
  standalone: true,
  imports: [CommonModule, JobCardComponent],
  templateUrl: './vacante-list.html',
  styleUrl: './vacante-list.css'
})
export class VacanteListComponent {
  jobsData = [
    {
      id: '1',
      title: 'Director de Operaciones',
      company: 'Centro de Comando, Control, Comunicaciones, Computadoras, Ciberseguridad e Inteligencia',
      location: 'Distrito Nacional, República Dominicana',
      type: 'Tiempo Completo',
      requirements: [
        'Rango militar: Coronel o General de Brigada',
        'Mínimo 18 años de experiencia en operaciones militares',
        'Formación en comando y control de operaciones conjuntas',
        'Experiencia en coordinación interagencial de defensa civil',
        'Conocimientos en gestión de crisis y emergencias'
      ],
      postedDate: '20/05/2025'
    },
    // ...agrega los demás trabajos aquí
  ];
}
