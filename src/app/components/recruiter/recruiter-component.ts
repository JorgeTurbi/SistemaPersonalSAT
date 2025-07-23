import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LucideAngularModule, FileDown, Eye, Users, TrendingUp, Filter } from 'lucide-angular';

interface Applicant {
  id: string;
  name: string;
  rank?: string;
  specialization: string;
  matchPercentage: number;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'interview' | 'selected' | 'rejected';
  profileImage?: string;
  experience: string;
  education: string;
  skills: string[];
}

@Component({
  selector: 'app-recruiter',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './recruiter-component.html',
  styleUrl: './recruiter-component.css'
})
export class RecruiterComponent implements OnInit {
  FileDown = FileDown;
  Eye = Eye;
  Users = Users;
  TrendingUp = TrendingUp;
  Filter = Filter;
  private route = inject(ActivatedRoute);
  jobId = this.route.snapshot.paramMap.get('jobId');
  itemsPerPage = 2;
  perPageOptions = [2,3,5, 10, 25, 50];
  currentPage = 1;
  total_pages=1;
  paginated_Applicants: Applicant[] = [];
  // Variables necesarias
  sortBy = signal<'match' | 'date' | 'name'>('match');
  sortOrder = signal<'asc' | 'desc'>('desc');
  statusFilter = signal<string>('all');
  pageSize = 2;
  jobTitle = 'Especialista en Ciberseguridad';
  jobCompany = 'Dirección de Ciberseguridad C5i';
// Al inicializar el componente
ngOnInit() {
  // Aquí asegúrate de que 'applicants' esté llena
  this.updatePagination();
}

  applicants = signal<Applicant[]>([

    {
      id: '1',
      name: 'Misael Zacarías G. Herrera Vásquez',
      rank: 'Capitán de Corbeta',
      specialization: 'Operaciones Navales y Ciberseguridad',
      matchPercentage: 92,
      appliedDate: '15/05/2025',
      status: 'reviewed',
      profileImage: '/images/Herrera.png',
      experience: '15+ años en operaciones navales',
      education: 'Maestría en Diplomacia, Licenciatura en Derecho',
      skills: ['Ciberseguridad', 'Liderazgo naval', 'Operaciones marítimas', 'Derecho internacional']
    },
    {
      id: '2',
      name: 'Ana María González Pérez',
      rank: 'Teniente Coronel',
      specialization: 'Ingeniería en Sistemas y Ciberseguridad',
      matchPercentage: 88,
      appliedDate: '12/05/2025',
      status: 'interview',
      experience: '12 años en sistemas de defensa',
      education: 'Maestría en Ciberseguridad, Ingeniería en Sistemas',
      skills: ['Seguridad informática', 'Redes', 'Análisis de vulnerabilidades', 'Gestión de incidentes']
    },
    {
      id: '3',
      name: 'Carlos Alberto Rodríguez',
      rank: 'Mayor',
      specialization: 'Especialista en Redes y Telecomunicaciones',
      matchPercentage: 75,
      appliedDate: '10/05/2025',
      status: 'pending',
      experience: '8 años en telecomunicaciones militares',
      education: 'Ingeniería en Telecomunicaciones',
      skills: ['Redes', 'Telecomunicaciones', 'Infraestructura TI', 'Soporte técnico']
    },
    {
      id: '4',
      name: 'María Elena Martínez',
      rank: 'Capitán',
      specialization: 'Analista de Inteligencia Cibernética',
      matchPercentage: 85,
      appliedDate: '08/05/2025',
      status: 'selected',
      experience: '10 años en inteligencia militar',
      education: 'Maestría en Inteligencia Estratégica',
      skills: ['Inteligencia cibernética', 'Análisis de amenazas', 'Investigación digital', 'Contrainteligencia']
    }
  ]);


get totalPages(): number {
  return Math.ceil(this.applicants().length / this.itemsPerPage);
}
  // get paginatedApplicants(): Applicant[] {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.applicants().slice(startIndex, startIndex + this.itemsPerPage);
  // }

  get paginatedApplicants(): Applicant[] {
    const sorted = this.applicants().sort((a, b) => b.matchPercentage - a.matchPercentage); // ejemplo
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return sorted.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Métodos de paginación
  updatePagination() {
  this.total_pages = this.totalPages;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginated_Applicants = this.applicants().slice(startIndex, endIndex);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  //---------------





  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  }

  interviewCount = computed(() =>
    this.applicants().filter(a => a.status === 'interview').length
  );

  selectedCount = computed(() =>
    this.applicants().filter(a => a.status === 'selected').length
  );


  getStatusBadge(status: Applicant['status']) {
    const statusMap = {
      pending: { label: 'Pendiente', color: 'bg-gray-200 text-gray-700' },
      reviewed: { label: 'Revisado', color: 'bg-blue-100 text-blue-800' },
      interview: { label: 'Entrevista', color: 'bg-yellow-100 text-yellow-800' },
      selected: { label: 'Seleccionado', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rechazado', color: 'bg-red-100 text-red-800' },
    };
    return statusMap[status];
  }

  getMatchColor(percentage: number): string {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  }

  sortedApplicants = computed(() => {
    let result = [...this.applicants()];
    const sort = this.sortBy();
    const order = this.sortOrder();
    result.sort((a, b) => {
      let cmp = 0;
      if (sort === 'match') cmp = a.matchPercentage - b.matchPercentage;
      else if (sort === 'date')
        cmp =
          new Date(a.appliedDate.split('/').reverse().join('-')).getTime() -
          new Date(b.appliedDate.split('/').reverse().join('-')).getTime();
      else cmp = a.name.localeCompare(b.name);
      return order === 'desc' ? -cmp : cmp;
    });
    return result.filter(
      (app) => this.statusFilter() === 'all' || app.status === this.statusFilter()
    );
  });

  avgMatchPercentage = computed(() => {
    const total = this.applicants().reduce((sum, a) => sum + a.matchPercentage, 0);
    return Math.round(total / this.applicants().length);
  });

  handleExportPDF() {
    console.log('Exportando a PDF...');
  }

  handleExportProfilePDF(applicantName: string) {
    console.log(`Generando PDF para ${applicantName}`);
  }
  // Si quieres que al cambiar itemsPerPage se actualice la tabla:
ngOnChanges() {
  this.updatePagination();
}
}

