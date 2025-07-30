import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule,Briefcase,GraduationCap } from 'lucide-angular';
import { IVacanteDto } from '../Vacancies/InterfaceVacantes/IVacanteDto';
import { SharedService } from '../GeneralServices/SharedService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-job-card',
  standalone:true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCardComponent  {


  @Input() data!:IVacanteDto;

  Briefcase = Briefcase;
  GraduationCap = GraduationCap;

/**
 *
 */
constructor(
  private shared:SharedService,
  private router:Router,
  private messageService:MessageService) { }


verDetalles()
{
  this.shared.changeMessage(this.data);
              this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Regidiriengo...' });

  this.router.navigate(['/jobsdetails']);
}
}




