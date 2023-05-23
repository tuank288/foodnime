import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBanner = true;
  showFooter = true;
  isAdmin = false;
  error = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url)
      }
    });
  }

  checkPath(url: string) {
    switch(true) {
      case url === 'admin' || url.startsWith('/admin'):
        this.isAdmin = true;
        break;
      case url === '/tags' || url.startsWith('/tags'):
        this.showBanner = false;
        break;
      case url === '/' || url.startsWith('/tag') || url === '/search' || url.startsWith('/search'):
        this.showBanner = true;
        this.showFooter = true;
        break;
      case url === '/login' || url.startsWith('/login'):
        this.showFooter = false;
        this.showBanner = false;
        break;
      case url === '/register'|| url.startsWith('/register'):
        this.showBanner = false;
        this.showFooter = false;
        break;
      default:
        this.showBanner = false;
        this.showFooter = true;
        break;
    }
  }
}
