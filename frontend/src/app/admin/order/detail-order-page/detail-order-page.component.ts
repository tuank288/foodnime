import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/user.service';
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
  Status = false;
  selected = 'SHIPPED';
  cancel = 'CANCELED';
  accept = 'PAYED';

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
    })
  }

  acceptSatus() {
    if(this.selected === 'SUCCESS'){
      this.orderDetail.status = this.accept;
    }
    this.orderDetail.active = this.selected;
    console.log(this.orderDetail.status);
    
    this.adminService.updateOrder(this.orderDetail, this.orderId).subscribe({
      next: res => {
        this.toast.success(`Cập nhật thành công`);
        this.router.navigate(['admin/ad-order']);
      }, error: err => {
      this.toast.error(`Cập nhật thất bại`)
      console.error(err);
      }
   });
  }

  cancelStatus() {
    
    this.orderDetail.active = this.cancel;
    console.log(this.orderDetail.status);
    this.adminService.updateOrder(this.orderDetail, this.orderId).subscribe({
      next: res => {
        this.toast.success(`Cập nhật thành công`);
        this.router.navigate(['admin/ad-order']);
      }, error: err => {
      this.toast.error(`Cập nhật thất bại`)
      console.error(err);
      }
   });
  }
  logout(){
    this.adminService.logout();
  }
}
