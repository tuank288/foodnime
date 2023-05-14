import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-detail-categories-page',
  templateUrl: './detail-categories-page.component.html',
  styleUrls: ['./detail-categories-page.component.scss']
})
export class DetailCategoriesPageComponent {
  categoryId!: string;
  categoryDetail!: Tag;
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
    ){}

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.categoryId = val['categoryId'];
      this.fetchFoodDetail(this.categoryId);
    })
  }

  fetchFoodDetail(categoryId: string) {
    this.adminService.getCategorydId(categoryId).subscribe(res => {
      this.categoryDetail = res;
      console.log(this.categoryDetail);
    })
  }
  logout(){
    this.userService.logout();
  }
}
