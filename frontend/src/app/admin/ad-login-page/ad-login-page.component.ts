import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/user.service';
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
              private userService:UsersService,
              private router:Router,
              ){}

  email = new FormControl('',[Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required, Validators.minLength(8)]);

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    // this.isSubmitted = true;
    if(this.loginForm.invalid) return;
    this.userService.login({email:this.fc.email.value, 
      password: this.fc.password.value}).subscribe(() => {
        this.router.navigateByUrl('/admin/ad-food')
      })
  }
}
