import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, RouterModule } from '@angular/router'; import { LucideAngularModule, User, Briefcase, GraduationCap, ArrowRight, Users, Shield, Award } from 'lucide-angular';
import { DashboardDTO } from './PagesInterfaces/DashboardDTO';
import { DashboardService } from './PagesServices/dashboard-service';
import { AuthService } from '../Auth/Services/auth-service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  encapsulation: ViewEncapsulation.None, // opcional
})
export class MainPage implements OnInit {

  user = User;
  briefcase = Briefcase;
  graduationcap = GraduationCap;
  arrowRight = ArrowRight;
  users = Users;
  shield = Shield;
  award = Award;
  router = inject(Router);
  service = inject(DashboardService);
  auth = inject(AuthService);
  PerfilDashboard: DashboardDTO = {} as DashboardDTO;
  isLogin = false;

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(isLogged => {
      this.isLogin = isLogged;
    });
    this.LoadDasboard();
  }

  LoadDasboard() {
    this.service.getDashboard().subscribe({
      next: (res: DashboardDTO) => {
        this.PerfilDashboard = res;
      },
      error: (err: any) => {
        console.error(err)
      }
    });
  }
  go(path: string) {
    this.router.navigate([path]);
  }
}
