import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';import { RouterModule } from '@angular/router';
import {  ArrowLeft, Building, MapPin, Calendar, DollarSign, Users, Phone, Mail, LucideAngularModule, Briefcase, GraduationCap, ChevronDown, ChevronUp } from 'lucide-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-jobcard-detail',
  imports: [CommonModule, RouterModule, LucideAngularModule,],
  templateUrl: './job.card.detail.html',
  styleUrl: './job.card.detail.css',
 animations: [ // 👈 Asegúrate de incluir esto
    trigger('accordionAnimation', [
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        animate('200ms ease-in', style({ height: '0', opacity: 0 }))
      ])
    ])
  ]
})
export class JobCardDetail {
  showResponsibilities = false;
showQualifications = false;
showBenefits = false;
  @Input() id!: string;
  @Input() title!: string;
  @Input() company!: string;
  @Input() location!: string;
  @Input() type!: string;
  @Input() requirements!: string[];
  @Input() postedDate!: string;

  @Input() salary!: string;
  @Input() teamSize!: string;
  @Input() experience!: string;
  @Input() description!: string;
  @Input() responsibilities!: string[];
  @Input() qualifications!: string[];
  @Input() benefits!: string[];
  @Input() contactEmail!: string;
  @Input() contactPhone!: string;

  Briefcase = Briefcase;
  GraduationCap = GraduationCap;
  DollarSign=DollarSign;
  Calendar=Calendar;
  Building=Building;
  MapPin=MapPin;
  Users=Users;
  ArrowLeft = ArrowLeft;
  Phone = Phone;
  Mail = Mail;
  ChevronDown=ChevronDown ;
  ChevronUp=ChevronUp



toggleSection(section: 'showResponsibilities' | 'showQualifications' | 'showBenefits') {
  this[section] = !this[section];
}
}


