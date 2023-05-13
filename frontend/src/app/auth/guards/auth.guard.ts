import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,  } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:UsersService, 
              private router:Router, 
              private cartService:CartService){
              }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cartObservable = this.cartService.getCartObservable();

      cartObservable.subscribe(selectedOrder => {
        if (selectedOrder.items.length === 0 && !state.url.startsWith('/track')) {
          this.router.navigate(['/']);
        }
      });

    if(this.userService.currentUser.token) return true;
    this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}})
    return false;
  }
  
}
