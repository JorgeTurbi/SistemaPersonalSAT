import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carddescription',
  imports: [CommonModule],
  templateUrl: './card-description-component.html',
  styleUrl: './card-description-component.css'
})
export class CardDescriptionComponent {
 @Input() customClass = '';
}
