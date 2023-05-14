import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ADMIN_URL, ADMIN_USER, USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constans/urls';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { User } from '../shared/models/User';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStogare());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Food ${user.full_name}!`,
            'Đăng nhập thành công'
          )
          console.log(user);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  register(userRegiser:IUserRegister):Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.full_name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed');
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStogare(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserToLocalStogare():User{
    const userJson = localStorage.getItem(USER_KEY)    
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
