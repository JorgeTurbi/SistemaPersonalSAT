import { Component, signal } from '@angular/core';
import { Toast } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vanguardia-empleos');
}
