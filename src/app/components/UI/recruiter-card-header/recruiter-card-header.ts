import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardheader',
  imports: [CommonModule],
  templateUrl: './recruiter-card-header.html',
  styleUrl: './recruiter-card-header.css'
})
export class RecruiterCardHeader {
  @Input() customClass = '';
}
