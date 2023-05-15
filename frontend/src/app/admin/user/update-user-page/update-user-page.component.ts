import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.scss']
})
export class UpdateUserPageComponent {
  status = false;

  createUserForm!: FormGroup;
  UserIdUpdate!: string;
  user!: User;

  addToggle()
 {
   this.status = !this.status;
 }

 roles: string[] = [
  '1',
  '2',
]

 constructor(
  private fb: FormBuilder,
  private adminService: AdminService,
  private router: Router,
  private toast: ToastrService,
  private activatedRouter: ActivatedRoute,
  private userService:UsersService
  ) {}

  full_name = new FormControl('',[Validators.required, Validators.minLength(5)]);
  phone_number = new FormControl('',[Validators.required, Validators.minLength(11)]);
  address = new FormControl('',[Validators.required, Validators.minLength(10)]);
  role = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createUserForm = this.fb.group({
      full_name: this.full_name,
      phone_number: this.phone_number,
      address: this.address,
      role: this.role,
    },

    this.activatedRouter.params.subscribe( val => {
      this.UserIdUpdate = val['userId'];
      console.log(this.UserIdUpdate);
      
      if (val && val['userId']) {
        this.adminService.getUserId(this.UserIdUpdate).subscribe( res => {
          this.fillFormUpdate(res);
          this.user = res;
          console.log(this.user);
        })
      }  
    })
    )
  }

  update() {
    this.adminService.updateUser(this.createUserForm.value, this.UserIdUpdate).subscribe({
      next: res => {
        this.toast.success(`Cập nhật thành công`);
        this.createUserForm.reset();
        this.router.navigate(['admin/ad-users']);
    }, error: err => {
      this.toast.error(`Cập nhật thất bại`)
      this.createUserForm.markAllAsTouched();
      console.error(err);
      }
    })
  }

  fillFormUpdate(user: User) {
    this.createUserForm.setValue({
      full_name: user.full_name,
      phone_number: user.phone_number,
      address: user.address,
      role: user.role,
    })
    console.log(this.role);
    
  }
  logout(){
    this.adminService.logout();
  }
}
