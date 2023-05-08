import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-food-page',
  templateUrl: './edit-food-page.component.html',
  styleUrls: ['./edit-food-page.component.scss']
})
export class EditFoodPageComponent implements OnInit {
  status = false;

  createFoodForm!: FormGroup;
  FoodIdUpdate!: string;
  public isUpdateActive: boolean = false;
  categories: Tag[] = [];
  food!: Food;

  addToggle()
 {
   this.status = !this.status;
 }

 constructor(
  private fb: FormBuilder,
  private foodService: FoodService,
  private adminService: AdminService,
  private router: Router,
  private toast: ToastrService,
  private activatedRouter: ActivatedRoute
  ) {}

  food_image = new FormControl('',[Validators.required]);
  food_name = new FormControl('',[Validators.required]);
  category_id = new FormControl('',[Validators.required]);
  price = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createFoodForm = this.fb.group({
      food_image: this.food_image,
      food_name: this.food_name,
      category_id: this.category_id,
      price: this.price,
    })

    this.foodService.getAllTag().subscribe(categories => this.categories = categories);

    this.activatedRouter.params.subscribe( val => {
      this.FoodIdUpdate = val['foodId'];
      if (val && val['foodId']) {
        this.adminService.getFoodId(this.FoodIdUpdate).subscribe( res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.food = res;
      })
    }  
    })
  
  }

  submit() {
    this.adminService.postFood(this.createFoodForm.value).subscribe({
      next: res => {
        this.toast.success(`Create success`);
        console.log(this.createFoodForm);
        
        this.createFoodForm.reset();
        this.router.navigate(['admin/ad-food']);
    }, error: err => {
      this.toast.error(err.error, `Create fail`);
      console.log(err);
      }
    })
  }

  update() {
    this.adminService.updateFood(this.createFoodForm.value, this.FoodIdUpdate).subscribe({
      next: res => {
        this.toast.success(`Cập nhật thành công`);
        this.createFoodForm.reset();
        this.router.navigate(['admin/ad-food']);
    }, error: err => {
      this.toast.error(`Cập nhật thất bại`)
      this.createFoodForm.markAllAsTouched();
      console.error(err);
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileName = file.name;
    console.log(fileName);
    
    this.createFoodForm.get('food_image')!.setValue(fileName);
  }

  fillFormUpdate(food: Food) {
    this.createFoodForm.setValue({
      food_image: food.food_image,
      food_name: food.food_name,
      category_id: food.category_id,
      price: food.price,
    })
  }
}
