import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { AllTagComponent } from './components/pages/all-tag/all-tag.component';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { AdFoodPageComponent } from './admin/food-page/ad-food-page/ad-food-page.component';
import { EditFoodPageComponent } from './admin/food-page/edit-food-page/edit-food-page.component';
import { DetailFoodPageComponent } from './admin/food-page/detail-food-page/detail-food-page.component';
import { AdCategoriesPageComponent } from './admin/categories-page/ad-categories-page/ad-categories-page.component';
import { EditCategoriesPageComponent } from './admin/categories-page/edit-categories-page/edit-categories-page.component';
import { DetailCategoriesPageComponent } from './admin/categories-page/detail-categories-page/detail-categories-page.component';
import { AdUserPageComponent } from './admin/user/ad-user-page/ad-user-page.component';
import { EditUserPageComponent } from './admin/user/edit-user-page/edit-user-page.component';
import { DetailUserPageComponent } from './admin/user/detail-user-page/detail-user-page.component';

const routes: Routes = [
  {path: 'admin',
    children: [
      {path: '', component: DashboardPageComponent},

      {path: 'ad-food', component: AdFoodPageComponent},
      {path: 'create-food', component: EditFoodPageComponent},
      {path: 'detail-food/:foodId', component: DetailFoodPageComponent},
      {path: 'update-food/:foodId', component: EditFoodPageComponent},

      {path: 'ad-categories', component: AdCategoriesPageComponent},
      {path: 'create-category', component: EditCategoriesPageComponent},
      {path: 'detail-category/:categoryId', component: DetailCategoriesPageComponent},
      {path: 'update-category/:categoryId', component: EditCategoriesPageComponent},

      
      {path: 'ad-users', component: AdUserPageComponent},
      {path: 'create-user', component: EditUserPageComponent},
      {path: 'detail-user/:userId', component: DetailUserPageComponent},
      {path: 'update-user/:userId', component: EditUserPageComponent},
    ]
  },


  {path: '', component:HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'food/:foodId', component:FoodPageComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: 'login', component:LoginPageComponent},
  {path: 'register', component:RegisterPageComponent},
  {path: 'tags', component:AllTagComponent},
  {path: 'checkout', component:CheckoutPageComponent, canActivate: [AuthGuard]},
  {path: 'payment', component:PaymentPageComponent, canActivate: [AuthGuard]},
  {path: 'track/:orderId', component:OrderTrackPageComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
