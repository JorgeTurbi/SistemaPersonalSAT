import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Languages, Bell, Sun, Moon, X, Menu, Briefcase,LanguagesIcon,Globe,LogOut } from 'lucide-angular';
import { ToastModule } from 'primeng/toast';
import { LanguageService } from '../../Services/language-service-';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ CommonModule, LucideAngularModule, ToastModule,FormsModule],
  templateUrl: './navbarcomponent.html',
  styleUrls: ['./navbarcomponent.css'],
  providers: [MessageService]
})
export class Navbarcomponent {

  Languages = Languages;
  Bell = Bell;
  Sun = Sun;
  Moon = Moon;
  X = X;
  Menu = Menu;
  Briefcase = Briefcase;
  Language= LanguagesIcon;
  Globe= Globe;
  logout= LogOut;

  // private notifications = inject(MessageService);
  // langService = inject(LanguageService);



  // mobileOpen = false;
  // isDark = document.documentElement.classList.contains('dark');

  // notify = this.notifications;
  // lang = this.langService;

  // toggleTheme() {
  //   this.isDark = !this.isDark;
  //   document.documentElement.classList.toggle('dark', this.isDark);
  //   this.notifications.add({
  //     severity: 'info',
  //     summary: 'Tema activado',
  //     detail: this.isDark ? 'Tema oscuro activado' : 'Tema claro activado',
  //     life: 3000
  //   });
  // }

  //   info(message: string, duration = 4000) {

  //       this.notifications.add({
  //     severity: 'info',
  //     summary: 'Information',
  //     detail: message,
  //     life: duration
  //   });
  // }
  // toggleLang() {
  //   const next = this.lang.lang() === 'es' ? 'en' : 'es';
  //   this.lang.setLanguage(next);

  //   this.notifications.add({

  //     severity: 'success',
  //     summary: 'Idioma cambiado',
  //     detail: next === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English',
  //     life: 3000
  //   });
  // }

  // closeMobile() {
  //   this.mobileOpen = false;
  // }

isMenuOpen = false;
  currentLanguage = 'es';
  router= inject(Router);

  t(key: string): string {
    // Aquí puedes integrar ngx-translate o tu función i18n personalizada
    const translations: any = {
      'nav.home': 'Inicio',
      'nav.jobs': 'Empleos',
      'nav.profile': 'Perfil',
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

}
