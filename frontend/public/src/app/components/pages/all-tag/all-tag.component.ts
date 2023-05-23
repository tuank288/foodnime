import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-all-tag',
  templateUrl: './all-tag.component.html',
  styleUrls: ['./all-tag.component.scss']
})
export class AllTagComponent {

  tags?:Tag[]

  constructor(foodService:FoodService) {
    foodService.getAllTag().subscribe(serverTag => {
      this.tags = serverTag;
    });
  }
}