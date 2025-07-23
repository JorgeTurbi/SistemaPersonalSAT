import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardcontent',
  imports: [CommonModule],
  templateUrl: './card-content-component.html',
  styleUrl: './card-content-component.css'
})
export class CardContentComponent {
 @Input() customClass = '';
}
