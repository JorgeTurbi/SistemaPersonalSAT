import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Languages, Bell, Sun, Moon, X, Menu, Briefcase, LanguagesIcon, Globe, LogOut } from 'lucide-angular';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ToastModule, FormsModule,RouterModule],
  templateUrl: './navbarcomponent.html',
  styleUrls: ['./navbarcomponent.css'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class Navbarcomponent implements OnInit {

  Languages = Languages;
  Bell = Bell;
  Sun = Sun;
  Moon = Moon;
  X = X;
  Menu = Menu;
  Briefcase = Briefcase;
  Language = LanguagesIcon;
  Globe = Globe;
  logout = LogOut;


  isMenuOpen = false;
  currentLanguage = 'es';
  router = inject(Router);
  isLogin:boolean=false;
  ngOnInit(): void {
   const token =localStorage.getItem('token');
   if (token) {
    this.isLogin=true;
   }
  }


  t(key: string): string {
    // Aquí puedes integrar ngx-translate o tu función i18n personalizada
    const translations: any = {
      'nav.home': 'Inicio',
      'nav.jobs': 'Empleos',
      'nav.profile': 'Perfil',
      'nav.aplicantes': 'Aplicantes',
      'nav.login': 'Iniciar sesión',
      'nav.register': 'Registrarse',
      'nav.logout': 'Cerrar sesión'
    };
    return translations[key] || key;
  }
  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.setLanguage(target.value);
    }
  }
  setLanguage(lang: string) {
    this.currentLanguage = lang;
    // Aquí también actualizarías el contexto global o usarías un servicio de idiomas
  }

  go(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }
  Salir()
  {
    localStorage.clear();
    localStorage.removeItem('token');

    localStorage.removeItem('user');
   const token= localStorage.getItem('token');
    if(!token)
    {
     this.router.navigate(['/login']);
    }
  }
}
