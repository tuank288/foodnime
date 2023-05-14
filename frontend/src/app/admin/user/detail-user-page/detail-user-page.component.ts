import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-detail-user-page',
  templateUrl: './detail-user-page.component.html',
  styleUrls: ['./detail-user-page.component.scss']
})
export class DetailUserPageComponent {
  userId!: string;
  userDetail!: User;
  //Sidebar toggle show hide function
  status = false;

  addToggle()
 {
   this.status = !this.status;
 }


  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private userService:UsersService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['userId'];
      this.fetchUserDetail(this.userId);
    })

  }

  fetchUserDetail(userId: string) {
    this.adminService.getUserId(userId).subscribe(res => {
      this.userDetail = res;
    })
  }
  logout(){
    this.userService.logout();
  }
}
