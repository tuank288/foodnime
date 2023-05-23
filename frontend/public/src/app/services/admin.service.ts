import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ADMIN_GET_FOOD, ADMIN_DELETE_FOOD, ADMIN_POST_FOOD, ADMIN_PUT_FOOD, ADMIN_DETAIL_FOOD, ADMIN_GET_CATEGORY, ADMIN_DELETE_CATEGORY, ADMIN_POST_CATEGORY, ADMIN_DETAIL_CATEGORY, ADMIN_PUT_CATEGORY, ADMIN_USER, ADMIN_DELETE_USER, ADMIN_POST_USER, ADMIN_DETAIL_USER, ADMIN_PUT_USER, ADMIN_GET_ORDER, ADMIN_DETAIL_ORDER, ADMIN_PUT_ORDER, ADMIN_LOGIN_URL, ADMIN_GET_TOTAL_ORDER } from '../shared/constans/urls';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../shared/models/Tag';
import { User } from '../shared/models/User';
import { Order } from '../shared/models/Order';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { IUserLogin } from '../shared/interfaces/IUserLogin';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private userSubject = new BehaviorSubject<User>(this.getUserToLocalStogare());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private storage: AngularFireStorage, private toastrService:ToastrService) { 
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(ADMIN_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStogare(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Food ${user.full_name}!`,
            'Đăng nhập thành công'
          )
          console.log(user);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Đăng nhập thất bại');
        }
      })
    );
  }

  private setUserToLocalStogare(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserToLocalStogare():User{
    const userJson = localStorage.getItem(USER_KEY)    
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

// food
  getFood(): Observable<Food[]>{
    return this.http.get<Food[]>(ADMIN_GET_FOOD)
  }

  deleteFood(foodId: string): Observable<Food>{
    return this.http.delete<Food>(ADMIN_DELETE_FOOD + foodId)
  }

  postFood(FoodObj: Food): Observable<Food> {
    return this.http.post<Food>(ADMIN_POST_FOOD, FoodObj)
  }

  updateFood(FoodObj: Food, foodId:string):Observable<Food> {
    return this.http.put<Food>(ADMIN_PUT_FOOD + foodId, FoodObj)
  }

  getFoodId(foodId: string): Observable<Food>{  
    return this.http.get<Food>(ADMIN_DETAIL_FOOD + foodId)
  }

//category
  getCategory(): Observable<Tag[]>{
    return this.http.get<Tag[]>(ADMIN_GET_CATEGORY)
  }

  deleteCategory(categoryId: string): Observable<Tag>{
    return this.http.delete<Tag>(ADMIN_DELETE_CATEGORY + categoryId)
  }

  postCategory(CategoryObj: Tag): Observable<Tag> {
    return this.http.post<Tag>(ADMIN_POST_CATEGORY, CategoryObj)
  }

  updateCategory(CategoryObj: Tag, categoryId:string):Observable<Tag> {
    return this.http.put<Tag>(ADMIN_PUT_CATEGORY + categoryId, CategoryObj)
  }

  getCategorydId(categoryId: string): Observable<Tag>{  
    return this.http.get<Tag>(ADMIN_DETAIL_CATEGORY + categoryId)
  }
// user  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(ADMIN_USER);
  }

  deleteUser(userId: string): Observable<User>{
    return this.http.delete<User>(ADMIN_DELETE_USER + userId)
  }

  postUser(UserObj: User): Observable<User> {
    return this.http.post<User>(ADMIN_POST_USER, UserObj)
  }

  updateUser(UserObj: User, userId:string):Observable<User> {
    return this.http.put<User>(ADMIN_PUT_USER + userId, UserObj)
  }

  getUserId(userId: string): Observable<User> {  
    return this.http.get<User>(ADMIN_DETAIL_USER + userId)
  }

//order
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ADMIN_GET_ORDER)
  }

  getTotalOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ADMIN_GET_TOTAL_ORDER)
  }

  getOrderId(orderId: string): Observable<Order> {
    return this.http.get<Order>(ADMIN_DETAIL_ORDER + orderId)
  }

  updateOrder(OrderObj: Order, orderId: string): Observable<Order> {
    return this.http.put<Order>(ADMIN_PUT_ORDER + orderId, OrderObj)
  }

  

  getFoodImage(path: string): Observable<string> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }

}
