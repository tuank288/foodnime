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

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url)
      }
    });
  }

  checkPath(url: string) {
    // if( url === '/tags' || url.startsWith('/tags')) {
    //   this.showBanner = false;
    // } else if(url === '/' || url.startsWith('/tag')) {
    //   this.showBanner = true;
    // }else {
    //   this.showBanner = false
    // }

    switch(true) {
      case url === '/tags':
        this.showBanner = false;
        break;
      case url === '/' || url.startsWith('/tag') || url === '/search' || url.startsWith('/search'):
        this.showBanner = true;
        this.showFooter = true;
        break;
      case url === '/login' :
        this.showFooter = false;
        break;
      case url === '/register':
        this.showFooter = false;
        break;
      default:
        this.showBanner = false;
        this.showFooter = true;
        break;
    }
  }
}
