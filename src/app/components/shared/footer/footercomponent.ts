import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.css',
  encapsulation: ViewEncapsulation.None, // opcional
})
export class Footercomponent {
  year = new Date().getFullYear();
}
