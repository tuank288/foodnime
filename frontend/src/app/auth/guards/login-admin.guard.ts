import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {
  constructor(private userService:UsersService, 
    private router:Router,
    private toastrService:ToastrService){
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(this.userService.currentUser.role);
      
      // if (this.userService.currentUser.role === '2') {
      //   this.toastrService.error('You do not have permission to access this page!', 'Access Denied');
      //   return false;
      // }
      return true;
  }
  
}
