import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../Auth/Services/auth-service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footercomponent.html',
  styleUrl: './footercomponent.css',
  encapsulation: ViewEncapsulation.None, // opcional
})
export class Footercomponent implements OnInit {
  year = new Date().getFullYear();
  isLogin=false;

  auth=inject(AuthService);

  ngOnInit():void{
    this.auth.isLoggedIn$.subscribe(isLogged => {
      this.isLogin = isLogged;
    });
  }
}
