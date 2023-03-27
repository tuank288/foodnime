import { Component } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  tags?:Tag[]

  constructor(foodService:FoodService) {
    foodService.getAllTag().subscribe(serverTag => {
      this.tags = serverTag;
    });
  }
}
