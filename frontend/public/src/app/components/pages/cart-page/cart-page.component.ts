import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.food_id)
  }

  changeQuantity(cartItem:CartItem, quantityInString:string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.food_id, quantity);
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.cartService.changeQuantity(cartItem.food.food_id, cartItem.quantity);
    }
  }
  
  increaseQuantity(cartItem: CartItem) {
    cartItem.quantity++;
    this.cartService.changeQuantity(cartItem.food.food_id, cartItem.quantity);
  }
}