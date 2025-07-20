import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.css'
})
export class Footercomponent {
 year = new Date().getFullYear();
}
