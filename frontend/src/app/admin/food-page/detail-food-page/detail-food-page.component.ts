import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { FoodService } from 'src/app/services/food.service';
import { UsersService } from 'src/app/services/user.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-detail-food-page',
  templateUrl: './detail-food-page.component.html',
  styleUrls: ['./detail-food-page.component.scss']
})
export class DetailFoodPageComponent {

  foodId!: string;
  foodDetail!: Food;
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
      this.foodId = val['foodId'];
      this.fetchFoodDetail(this.foodId);
    })
  }

  fetchFoodDetail(foodId: string) {
    this.adminService.getFoodId(foodId).subscribe(res => {
      this.foodDetail = res;
      console.log(this.foodDetail);
    })
  }
  logout(){
    this.adminService.logout();
  }
}
