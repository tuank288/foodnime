import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  orders: Order[] = [];
  constructor(private orderService:OrderService){}

  ngOnInit(){
    this.orderService.getOrders().subscribe(res =>{
      this.orders = res;
      console.log('fsdfsa');
      
    })
  }
}
