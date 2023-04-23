import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_GET_FOOD, ADMIN_DELETE_FOOD, ADMIN_POST_FOOD, ADMIN_UPDATE_FOOD, ADMIN_DETAIL_FOOD, ADMIN_GET_CATEGORY, ADMIN_DELETE_CATEGORY, ADMIN_POST_CATEGORY, ADMIN_DETAIL_CATEGORY, ADMIN_UPDATE_CATEGORY, ADMIN_USER, ADMIN_DELETE_USER, ADMIN_POST_USER, ADMIN_DETAIL_USER, ADMIN_UPDATE_USER } from '../shared/constans/urls';
import { Food } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../shared/models/Tag';
import { User } from '../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
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
    return this.http.put<Food>(ADMIN_UPDATE_FOOD + foodId, FoodObj)
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
    return this.http.put<Tag>(ADMIN_UPDATE_CATEGORY + categoryId, CategoryObj)
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

  postUser(UserObj: User): Observable<Tag> {
    return this.http.post<Tag>(ADMIN_POST_USER, UserObj)
  }

  updateUser(UserObj: User, userId:string):Observable<User> {
    return this.http.put<User>(ADMIN_UPDATE_USER + userId, UserObj)
  }

  getUserId(userId: string): Observable<User>{  
    return this.http.get<User>(ADMIN_DETAIL_USER + userId)
  }

}
