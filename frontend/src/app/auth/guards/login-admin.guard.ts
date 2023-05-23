import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {
  constructor(private adminService:AdminService, 
    private router:Router,
    private toastrService:ToastrService){
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.adminService.currentUser.token && this.adminService.currentUser.role === '1' && state.url === '/admin/login'){
      this.router.navigate(['/admin']);
    }
    return true;
  
  }
}
