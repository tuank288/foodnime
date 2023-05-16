import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders!: Order[];

  constructor(private orderService:OrderService){}

  ngOnInit() {
    // Lấy danh sách đơn hàng từ API hoặc nguồn dữ liệu khác và gán cho biến orders
    this.getOrders();
  }
  

  getOrders() {
    this.orderService.getOrders().subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  hasActiveOrders(): boolean {
    return this.orders.some(order => order.active !== null);
  }
}
