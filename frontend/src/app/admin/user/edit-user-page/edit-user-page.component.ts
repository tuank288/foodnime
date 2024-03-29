import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.scss']
})
export class EditUserPageComponent {
  status = false;

  createUserForm!: FormGroup;
  UserIdUpdate!: string;
  public isUpdateActive: boolean = false;
  user!: User;

  addToggle()
 {
   this.status = !this.status;
 }

 roles: number[] = [
  1,
  2,
]

 constructor(
  private fb: FormBuilder,
  private adminService: AdminService,
  private router: Router,
  private toast: ToastrService,
  private activatedRouter: ActivatedRoute,
  private userService:UsersService
  ) {}

  full_name = new FormControl('',[Validators.required]);
  email = new FormControl('',[Validators.required, Validators.email]);
  phone_number = new FormControl('',[Validators.required, Validators.pattern('^[0]{1}[0-9]{9}$')]);
  password = new FormControl('',[Validators.required, Validators.minLength(8)]);
  confirmPassword = new FormControl('',[Validators.required]);
  address = new FormControl('',[Validators.required, Validators.minLength(10)]);
  role = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createUserForm = this.fb.group({
      full_name: this.full_name,
      email: this.email,
      phone_number: this.phone_number,
      password: this.password,
      confirmPassword: this.confirmPassword,
      address: this.address,
      role: this.role,
    },  { validator: this.ConfirmedValidator('password', 'confirmPassword')} as AbstractControlOptions)
  }

  submit() {
    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.toast.error('Xin vui lòng điền đầy đủ', 'Error');
      return;
    }
    this.adminService.postUser(this.createUserForm.value).subscribe({
      next: res => {
        this.toast.success(`Tạo thành công`);
        console.log(this.createUserForm);
        
        this.createUserForm.reset();
        this.router.navigate(['admin/ad-users']);
    }, error: (err) => {
      this.toast.error(err.error, 'Tạo thất bại');
      console.log(err);
      }
    })
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  logout(){
    this.adminService.logout();
  }
}
