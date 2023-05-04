import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { Observable, map } from "rxjs";
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_TAGS_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/constans/urls';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }

  getAllFoodsBySearchTerm(searchTerm:string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
    .pipe(map(foods => foods.filter(food => food.food_name.toLowerCase()
        .includes(searchTerm.toLowerCase()))
      )
    )
  }
  getAllTag():Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag:string):Observable<Food[]> {
    return tag === "All" ? 
    this.getAll() :
    this.http.get<Food[]>(FOODS_TAG_URL + tag)
    .pipe(
      map(foods => foods.filter(food => food.category_name?.includes(tag))
    ))
  }
  getFoodById(foodId:string):Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId)
  }



}
