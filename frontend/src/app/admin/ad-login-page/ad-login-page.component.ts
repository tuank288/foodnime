import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ADMIN_LOGIN_URL, USER_LOGIN_URL } from 'src/app/shared/constans/urls';
import { IUserLogin } from 'src/app/shared/interfaces/IUserLogin';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-ad-login-page',
  templateUrl: './ad-login-page.component.html',
  styleUrls: ['./ad-login-page.component.scss']
})
export class AdLoginPageComponent {
  loginForm!: FormGroup;
  user!: User;
  constructor( private fb: FormBuilder,
              private adminServer:AdminService,
              private router:Router,
              private http:HttpClient,
              private toastrService:ToastrService
              ){}

  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(8)]);

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }
  
  submit(){
    this.adminServer.login(this.loginForm.value).subscribe(res => {
        this.router.navigate(['/admin']);
    }
    )
  }
}
