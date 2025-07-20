import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbarcomponent } from '../nav/navbarcomponent';
import { Footercomponent } from '../footer/footercomponent';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbarcomponent, Footercomponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css'
})
export class MainLayoutComponent {

}
