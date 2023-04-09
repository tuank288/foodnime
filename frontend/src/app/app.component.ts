import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showBanner = true;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url)
      }
    });
  }

  checkPath(url: string) {
    if( url === '/tags' || url.startsWith('/tags')) {
      this.showBanner = false;
    } else if(url === '/' || url.startsWith('/tag')) {
      this.showBanner = true;
    }else {
      this.showBanner = false
    }
  }
}
