import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  status = false;
  totalOrders: number = 0;
  totalUsers: number = 0;
  user: User[] = [];

  addToggle()
  {
    this.status = !this.status
  }

  constructor(private userService: UsersService, private orderService: OrderService) {
    userService.getUsers().subscribe((users) => {
      const totalUsers = users.reduce((sum: number, user: User) => {
        return sum + 1;
      }, 0);
      console.log('Total users:', totalUsers);
      this.totalUsers = totalUsers;
    });

    novelService.getAllNovels().subscribe((novels) => {
      const totalNovels = novels.reduce((sum: number, novel: Novel) => {
        return sum + 1;
      }, 0);
      console.log('Total novels:', totalNovels);
      this.totalNovels = totalNovels;
    });

}
