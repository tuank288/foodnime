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
  expandedAccordions: string[] = [];
  constructor(private orderService:OrderService){}

  ngOnInit() {
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
      console.log(this.orders);
      
    })
  }

  isAccordionExpanded(order: Order): boolean {
    return this.expandedAccordions.includes(order.order_id);
  }

  toggleAccordion(order: Order): void {
    const index = this.expandedAccordions.indexOf(order.order_id);
    if (index > -1) {
      this.expandedAccordions.splice(index, 1);
    } else {
      this.expandedAccordions.push(order.order_id);
    }
  }
}
