import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UsersService,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private router: Router) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.total_price = cart.totalPrice;               
              }
              
  ngOnInit(): void {
    let {full_name, address, phone_number} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      full_name:[full_name, [Validators.required]],
      address:[address, [Validators.required, Validators.minLength(10)]],
      phone_number:[phone_number, [Validators.required, Validators.pattern('^[0]{1}[0-9]{9}$')]]
    });
  }
  
  get fc(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning('Vui lòng điền thông tin', 'Thông tin không hợp lệ');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning('Vui lòng chọn vị trí của bạn trên bản đồ', 'Vị trí');
      return;
    }

    this.order.full_name = this.fc.full_name.value;
    this.order.address = this.fc.address.value;
    this.order.phone_number = this.fc.phone_number.value;
    
    console.log(this.order,'order');
    
    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }
}
