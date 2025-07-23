import { Component, inject, Input } from '@angular/core';
import { ArrowLeft, LucideAngularModule } from "lucide-angular";
import { JobCardDetail } from '../JobcardDetails/job.card.detail';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacante-details',
  imports: [ LucideAngularModule,JobCardDetail,RouterModule, CommonModule],
  templateUrl: './vacante-details.html',
  styleUrl: './vacante-details.css'
})
export class VacanteDetails {
  ArrowLeft=ArrowLeft;
@Input() jobId: string = '';
    router =inject(Router)
  job = {
    title: "Especialista en Ciberseguridad",
    company: "Dirección de Ciberseguridad C5i",
    location: "Distrito Nacional, República Dominicana",
    type: "Tiempo Completo",
    salary: "RD$85,000 - RD$120,000",
    teamSize: "15-20 personas",
    experience: "3-5 años",
    posted: "16 de mayo, 2025",
    description: "Buscamos un especialista en ciberseguridad con experiencia militar para fortalecer nuestras capacidades de defensa digital en el C5i...",
    responsibilities: [
      "Monitorear y analizar amenazas de ciberseguridad en tiempo real",
      "Implementar y mantener protocolos de seguridad informática militar",
      "Realizar análisis forense digital en caso de incidentes",
      "Coordinar respuestas a emergencias cibernéticas",
      "Capacitar al personal en mejores prácticas de seguridad",
      "Proteger los sistemas de información del C5i"
    ],
    qualifications: [
      "Título en Ingeniería de Sistemas, Ciberseguridad o afín",
      "Mínimo 5 años de experiencia en ciberseguridad",
      "Certificaciones en CISSP, CEH o similares (preferible)",
      "Experiencia en protección de sistemas críticos",
      "Conocimientos en análisis forense digital y SIEM"
    ],
    benefits: [
      "Seguro médico militar completo",
      "Capacitación y certificaciones internacionales",
      "Oportunidades de ascenso dentro de las Fuerzas Armadas",
      "Estabilidad laboral y pensión militar",
      "Acceso a tecnología de punta",
      "Beneficios adicionales del personal militar"
    ],
    contactEmail: "reclutamiento@c5i.mil.do",
    contactPhone: "829-462-7091"
  };
  goDetails()
  {
    this.router.navigate(['/jobs']);
  }
}
