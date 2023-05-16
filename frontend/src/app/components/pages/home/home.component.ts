import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Observable, map } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  foods:Food[] = [];
  showTags = true;

  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute, private router: Router) {
    let foodsObservalbe:Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      foodsObservalbe = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
      foodsObservalbe = this.foodService.getAllFoodsByTag(params.tag)
      else foodsObservalbe = this.foodService.getAll().pipe(
        map((foods) => {
          return foods.sort((a, b) => {
            if (a.created_at && b.created_at) {
              return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            } else {
              return 0; 
            }
          })
        })
      )

      foodsObservalbe.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
    });

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkPath(event.url)
      }
    });
  }

  checkPath(url: string) {
    if(url.startsWith('/tag') || url.startsWith('/search')) {
      this.showTags = false;
    } else {
      this.showTags = true;
    }
  }

}
