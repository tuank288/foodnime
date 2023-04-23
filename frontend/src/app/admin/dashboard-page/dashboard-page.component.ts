import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { Food } from 'src/app/shared/models/Food';
import { Order } from 'src/app/shared/models/Order';
import { Tag } from 'src/app/shared/models/Tag';
import { User } from 'src/app/shared/models/User';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  status = false;
  totalOrders: number = 0;
  totalFood: number = 0;
  totalPrice: number = 0;
  users: User[] = [];
  tags: Tag[] = [];
  orders: Order[] = [];
  foods: Food[] = [];
  toggleSidebar()
  {
    this.status = !this.status;
  }

  constructor(private adminService: AdminService, private orderService: OrderService, private foodService: FoodService) {
    this.foodService.getAll().subscribe((food) => {
      const totalFood = food.reduce((sum: number, food: Food) => {
        return sum + 1;
      }, 0);
      this.totalFood = totalFood;
    });

    this.orderService.getAllOrders().subscribe((orders) => {
      const totalOrders = orders.reduce((sum: number, order: Order) => {
        return sum + 1;
      }, 0);
      this.totalOrders = totalOrders;
    });

    this.orderService.getAllTotalPrice().subscribe((totals) => {
      const totalPrice = totals.reduce((sum: number, order: Order) => {
        return sum + order.total_price;
      }, 0);
      this.totalPrice = totalPrice;
    })

    this.foodService.getAll().subscribe(food => {
      this.foods = food
      this.foods.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else {
          return 0; 
        }
      });
    })

    this.adminService.getUsers().subscribe(user => {
      this.users = user
      this.users.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        } else {
          return 0; 
        }
      });
    })
  }
}
