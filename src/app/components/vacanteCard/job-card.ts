import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule,Briefcase,GraduationCap } from 'lucide-angular';

@Component({
  selector: 'app-job-card',
  standalone:true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCardComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() company!: string;
  @Input() location!: string;
  @Input() type!: string;
  @Input() requirements!: string[];
  @Input() postedDate!: string;

  Briefcase = Briefcase;
  GraduationCap = GraduationCap;
}
