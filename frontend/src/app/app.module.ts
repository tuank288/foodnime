import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
 
import { NgConfirmModule } from 'ng-confirm-box';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';

import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';

import { SearchComponent } from './components/partials/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { PaypalButtonComponent } from './components/partials/paypal-button/paypal-button.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';
import { LoadingService } from './services/loading.service';
import { FooterComponent } from './components/partials/footer/footer.component';
import { BanerComponent } from './components/partials/baner/baner.component';
import { AllTagComponent } from './components/pages/all-tag/all-tag.component';
import { OrdersComponent } from './components/pages/orders/orders.component';

import { DashboardPageComponent } from './admin/dashboard-page/dashboard-page.component';
import { AdFoodPageComponent } from './admin/food-page/ad-food-page/ad-food-page.component';
import { EditFoodPageComponent } from './admin/food-page/edit-food-page/edit-food-page.component';
import { DetailFoodPageComponent } from './admin/food-page/detail-food-page/detail-food-page.component';
import { AdCategoriesPageComponent } from './admin/categories-page/ad-categories-page/ad-categories-page.component';
import { EditCategoriesPageComponent } from './admin/categories-page/edit-categories-page/edit-categories-page.component';
import { DetailCategoriesPageComponent } from './admin/categories-page/detail-categories-page/detail-categories-page.component';
import { DetailUserPageComponent } from './admin/user/detail-user-page/detail-user-page.component';
import { AdUserPageComponent } from './admin/user/ad-user-page/ad-user-page.component';
import { EditUserPageComponent } from './admin/user/edit-user-page/edit-user-page.component';
import { AdOrderComponent } from './admin/order/ad-order/ad-order.component';
import { DetailOrderPageComponent } from './admin/order/detail-order-page/detail-order-page.component';
import { ErrorComponent } from './components/partials/error/error.component';
import { AdLoginPageComponent } from './admin/ad-login-page/ad-login-page.component';
import { environment } from 'src/environments/environment';
import { UpdateUserPageComponent } from './admin/user/update-user-page/update-user-page.component';
import { AdTotalOrderPageComponent } from './admin/totalOrder/ad-total-order-page/ad-total-order-page.component';
import { DetailTotalOrderPageComponent } from './admin/totalOrder/detail-total-order-page/detail-total-order-page.component';
import { ProfileComponent } from './components/pages/profile/profile.component';




registerLocaleData(localeVi);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    PaypalButtonComponent,
    OrderTrackPageComponent,
    FooterComponent,
    BanerComponent,
    AllTagComponent,
    OrdersComponent,
    DashboardPageComponent,
    AdFoodPageComponent,
    EditFoodPageComponent,
    DetailFoodPageComponent,
    AdCategoriesPageComponent,
    EditCategoriesPageComponent,
    DetailCategoriesPageComponent,
    DetailUserPageComponent,
    AdUserPageComponent,
    EditUserPageComponent,
    AdOrderComponent,
    DetailOrderPageComponent,
    ErrorComponent,
    AdLoginPageComponent,
    UpdateUserPageComponent,
    AdTotalOrderPageComponent,
    DetailTotalOrderPageComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatInputModule,
    MatChipsModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    NgConfirmModule,
    MatExpansionModule,
    MatGridListModule,
    MatBadgeModule,
    MatTabsModule,

    ToastrModule.forRoot({
      extendedTimeOut: 5000,
      timeOut: 3000,
      newestOnTop: true,
    }),

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [
    LoadingService,
    {provide: LOCALE_ID, useValue: 'vi-VN'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
