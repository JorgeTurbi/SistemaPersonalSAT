import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardtitle',
  imports: [CommonModule],
  templateUrl: './card-title-component.html',
  styleUrl: './card-title-component.css'
})
export class CardTitleComponent {
 @Input() customClass = '';
}
