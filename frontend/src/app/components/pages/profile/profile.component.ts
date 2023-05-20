import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  createUserForm!: FormGroup;
  user!: User;
  userId!: string;
  isReadOnly: boolean = true;


 constructor(
  private fb: FormBuilder,
  private toast: ToastrService,
  private userService:UsersService,
  private adminService:AdminService
  ) {}

  full_name = new FormControl('',[Validators.required]);
  email = new FormControl('',[Validators.required, Validators.email]);
  phone_number = new FormControl('',[Validators.required, Validators.pattern('^[0]{1}[0-9]{9}$')]);
  address = new FormControl('',[Validators.required, Validators.minLength(10)]);

  ngOnInit() {
    this.createUserForm = this.fb.group({
      full_name: this.full_name,
      email: this.email,
      phone_number: this.phone_number,
      address: this.address,
    })

    this.userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      this.fillFormUpdate(newUser);
    });
  }

  edit(){
    this.isReadOnly = false
  }

  save(){

    if (!this.createUserForm.valid) {
      this.createUserForm.markAllAsTouched();
      this.toast.error('Xin vui lòng điền đầy đủ', 'Error');
      return;
    }

    this.isReadOnly = true

    const fullName = this.createUserForm.value.full_name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

  const address = this.createUserForm.value.address
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match:any) => match.toUpperCase());

    const updatedUserData = { ...this.createUserForm.value, full_name: fullName, address: address };

    this.userService.updateUser(updatedUserData).subscribe({  
      next: res => {
        setTimeout(() => {
          location.reload(); 
        }, 1000); 
        this.userService.updateUserInLocalStorage(updatedUserData)
        this.toast.success(`Cập nhật thành công`);
    }, error: err => {
      this.toast.error(err.error,`Cập nhật thất bại`)
      this.createUserForm.markAllAsTouched();
      console.error(err);
      }
    })
  }

  fillFormUpdate(user: User) {
    this.createUserForm.setValue({
      full_name: user.full_name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
    })
  }
}
