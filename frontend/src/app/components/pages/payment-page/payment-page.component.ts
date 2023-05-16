import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {

  order:Order = new Order();
  constructor(private orderService: OrderService, 
              private router: Router,
              private cartService: CartService,
              private toastrService: ToastrService) {   
    this.orderService.getNewOrderForCurrentUser().subscribe({
        next: (order) => {
          this.order = order;
          // console.log(order);
        },
        error:() => {
          this.router.navigateByUrl('/chekcout');
        }
      })
   }

  pay(){
    this.orderService.pay(this.order).subscribe({
      next: (orderId) => {
        this.cartService.clearCart();
        this.router.navigateByUrl('/track/' + orderId);
        this.toastrService.success(
          'Payment Saved Successfully',
          'Success'
        );
      },
      error:(error) => {
        this.toastrService.error('Payment Save Failed', 'Error');
        console.log(error);
      }
    })
  }
}
