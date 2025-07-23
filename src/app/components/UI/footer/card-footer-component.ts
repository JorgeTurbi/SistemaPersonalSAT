import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardfooter',
  imports: [CommonModule],
  templateUrl: './card-footer-component.html',
  styleUrl: './card-footer-component.css'
})
export class CardFooterComponent {
 @Input() customClass = '';
}
