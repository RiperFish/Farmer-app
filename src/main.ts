import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { routes } from './app/app.routes';
import { HeaderComponent } from './app/shared/header.component';
import { TopNavComponent } from './app/shared/top-nav.component';
import { BottomNavComponent } from './app/shared/bottom-nav.component';
import { AuthService } from './app/core/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TopNavComponent, BottomNavComponent, CommonModule],
  template: `
    <app-header *ngIf="showHeader"></app-header>
    <app-top-nav></app-top-nav>
    <main [class.with-header]="showHeader" [class.with-top-nav]="showTopNav">
      <router-outlet></router-outlet>
    </main>
    <app-bottom-nav></app-bottom-nav>
  `,
  styles: [`
    main {
      min-height: 100vh;
    }

    @media (min-width: 768px) {
      main.with-header {
        padding-top: 60px;
      }
    }

    @media (max-width: 767px) {
      main {
        padding-bottom: 72px;
      }

      main.with-top-nav {
        padding-top: 56px;
      }
    }
  `]
})
export class App {
  showHeader = false;
  showTopNav = false;
  private currentPath = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    this.currentPath = this.router.url;
    this.updateFlags();

    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.currentPath = e.urlAfterRedirects;
      this.updateFlags();
    });
  }

  private updateFlags(): void {
    const isAuthPage = ['/login', '/register'].includes(this.currentPath);
    this.showHeader = !isAuthPage;
    this.showTopNav = !isAuthPage;
  }
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});
