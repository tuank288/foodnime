import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { Food } from 'src/app/shared/models/Food';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-detail-order-page',
  templateUrl: './detail-order-page.component.html',
  styleUrls: ['./detail-order-page.component.scss']
})
export class DetailOrderPageComponent {

  orderId!: string;
  orderDetail!: Order;
  //Sidebar toggle show hide function
  status = false;

  addToggle()
 {
   this.status = !this.status;
 }

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService
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
}
