import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.scss']
})
export class OrderTrackPageComponent {
  order!:Order;
  constructor(activatedRoute: ActivatedRoute,
              orderService:OrderService,
              router: Router,) {
     const params = activatedRoute.snapshot.params;
     if(!params.orderId) return;

     orderService.trackOrderById(params.orderId).subscribe({
      next: (order) => {
        this.order = order;
        console.log(order);
      },
      error:() => {
        router.navigateByUrl('/chekcout');
      }
    })
 }
}
