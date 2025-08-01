import { Component, inject, ViewEncapsulation } from '@angular/core';

import { Router, RouterModule } from '@angular/router'; import { LucideAngularModule, User, Briefcase, GraduationCap, ArrowRight, Users, Shield, Award } from 'lucide-angular';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, RouterModule],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
  encapsulation: ViewEncapsulation.None, // opcional
})
export class MainPage {
  user = User;
  briefcase = Briefcase;
  graduationcap = GraduationCap;
  arrowRight = ArrowRight;
  users = Users;
  shield = Shield;
  award = Award;
  router = inject(Router);

  go(path: string) {
    this.router.navigate([path]);
  }
}
