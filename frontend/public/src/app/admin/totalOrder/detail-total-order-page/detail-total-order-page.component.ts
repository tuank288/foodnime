import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-detail-total-order-page',
  templateUrl: './detail-total-order-page.component.html',
  styleUrls: ['./detail-total-order-page.component.scss']
})
export class DetailTotalOrderPageComponent {

  orderId!: string;
  orderDetail!: Order;
  //Sidebar toggle show hide function
  Status = false;

  addToggle()
 {
   this.Status = !this.Status;
 }

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private toast: ToastrService,
    private userService:UsersService
  ){}

  
  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.orderId = val['orderId'];
      this.fetchFoodDetail(this.orderId);
    })
  }

  fetchFoodDetail(orderId: string) {
    this.adminService.getOrderId(orderId).subscribe(res => {
      this.orderDetail = res;
      console.log(this.orderDetail);
      
    })
  }

  logout(){
    this.adminService.logout();
  }
}
