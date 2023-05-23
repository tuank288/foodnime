import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UsersService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/Cart';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartQuantity = 0;
  user!:User;
  userId!:User;
  constructor(cartService:CartService,private userService:UsersService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })

    // this.userService.getUser().subscribe(newUser => {
    //   this.userId = newUser;
    //   console.log(this.user);
    // })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  logout(){
    this.userService.logout();
  }

  get isAuth(){
    return this.user.token;
  }
}
