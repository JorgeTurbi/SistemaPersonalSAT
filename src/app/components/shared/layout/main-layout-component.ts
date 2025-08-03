import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbarcomponent } from '../nav/navbarcomponent';
import { Footercomponent } from '../footer/footercomponent';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbarcomponent, Footercomponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
  encapsulation: ViewEncapsulation.None, // opcional
})
export class MainLayoutComponent implements OnInit {
  ngOnInit(): void {
     const token= localStorage.getItem('token');
     if (!token) {
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     }


  }

}
