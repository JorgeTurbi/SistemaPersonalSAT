import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-uicard',
  imports: [CommonModule],
  templateUrl: './recruiter-card.html',
  styleUrl: './recruiter-card.css'
})
export class RecruiterCard {
  @Input() customClass = '';
}
