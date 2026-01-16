import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet } from '@angular/router';
import { routes } from './app/app.routes';
import { HeaderComponent } from './app/shared/header.component';
import { AuthService } from './app/core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <app-header *ngIf="showHeader()"></app-header>
    <main [class.with-header]="showHeader()">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }

    main.with-header {
      padding-top: 60px;
    }
  `]
})
export class App {
  constructor(public authService: AuthService) {}

  showHeader(): boolean {
    const currentPath = window.location.pathname;
    return !['/login', '/register'].includes(currentPath);
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
