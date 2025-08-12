import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LucideAngularModule, Globe, LogOut, Menu, X } from 'lucide-angular';
import { HttpClient } from '@angular/common/http';
import { filter } from 'rxjs';
import { environment } from '../../../../Enviroments/enviroment';
import { AuthService, SessionInfo } from '../../Auth/Services/auth-service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  templateUrl: './navbarcomponent.html',
  styleUrls: ['./navbarcomponent.css'],
  encapsulation: ViewEncapsulation.None, // opcional
})
export class Navbarcomponent implements OnInit {
  // Iconos usados
  Globe = Globe;
  logout = LogOut;
  Menu = Menu;
  X = X;

  // Estado UI
  isMenuOpen = false;
  currentLanguage = 'es';
  private auth = inject(AuthService);
  isLogin = false;
  isRol!:string;
  session: SessionInfo | null = null;

  // Inyecciones
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLogged => {
      this.isLogin = isLogged;

    });
 this.auth.sessionInfo$.subscribe(a=>this.isRol= a?.role.toString()!)

    // También puedes forzar una verificación inicial
    this.auth.checkSession().subscribe();
    this.updateLoginState();

    // Re-evaluar login al navegar (por si cambia user en storage)
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.updateLoginState();
    });
  }

  private updateLoginState() {
    // Con cookie HttpOnly no podemos leer token; usamos 'user' como flag de sesión en el cliente
   this.auth.isLoggedIn$.subscribe(isLogged => {
      this.isLogin = isLogged;
    });
  }


  // i18n dummy
  t(key: string): string {
    const translations: Record<string, string> = {
      'nav.home': 'Inicio',
      'nav.jobs': 'Empleos',
      'nav.profile': 'Perfil',
      'nav.aplicantes': 'Aplicantes',
      'nav.login': 'Iniciar sesión',
      'nav.register': 'Registrarse',
      'nav.logout': 'Cerrar sesión',
      'nav.mensaje': 'mensajes',
      'nav.respuesta': 'Mensaje',
      'nav.send':'Actualizar'
    };
    return translations[key] ?? key;
  }

  onLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target?.value) this.setLanguage(target.value);
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    // Aquí podrías invocar tu servicio de traducción
  }

  go(path: string) {
    this.router.navigate([path]);
    this.isMenuOpen = false;
  }

  // Logout real: revoca sesión en el backend y limpia 'user'
  logoutClick() {
    this.http
      .post(`${environment.apiUrl}/Auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => this.finishLogout(),
        error: () => this.finishLogout(), // incluso si falla, limpiamos cliente
      });
  }

  private finishLogout() {
    localStorage.removeItem('user'); // no usamos token en local
    this.updateLoginState();
    this.router.navigate(['/login']);
  }
    get isAdmin(): boolean {

    return (this.session?.role ?? '').toLowerCase() === 'admin';
  }
}
