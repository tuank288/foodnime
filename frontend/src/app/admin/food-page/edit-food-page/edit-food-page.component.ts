import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from 'src/app/services/user.service';
 
@Component({
  selector: 'app-edit-food-page',
  templateUrl: './edit-food-page.component.html',
  styleUrls: ['./edit-food-page.component.scss']
})
export class EditFoodPageComponent implements OnInit {
  status = false;

  fileTemp: any;
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
  private activatedRouter: ActivatedRoute,
  private fireStogre: AngularFireStorage,
  private userService:UsersService
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

    this.activatedRouter.params.subscribe( val => {
      this.FoodIdUpdate = val['foodId'];
      if (val && val['foodId']) {
        this.adminService.getFoodId(this.FoodIdUpdate).subscribe( res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.food = res;
          console.log(res);
      })
    }  
    })

    this.foodService.getAllTag().subscribe(categories => this.categories = categories);
  
  }

  async submit() {

    // if (!this.createFoodForm.valid) {
    //   this.createFoodForm.markAllAsTouched();
    //   this.toast.error('Please fill in all required fields', 'Error');
    //   return;
    // }

    const file = this.createFoodForm.get('food_image')?.value;
    
    let foodImageUrl = '';
    if (file) {
      const path = `food/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      foodImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createFoodForm.value, food_image: foodImageUrl};

    console.log(formData);
    this.adminService.postFood(formData).subscribe({
      next: res => {
        this.toast.success(`Tạo thành công`);
        console.log(this.createFoodForm);
        
        this.createFoodForm.reset();
        this.router.navigate(['admin/ad-food']);
    }, error: err => {
      this.toast.error(err.error, `Tạo thất bại`);
      console.log(err);
      }
    })
  }

   async update() {
    if (!this.createFoodForm.valid) {
      this.createFoodForm.markAllAsTouched();
      this.toast.error('Xin vui lòng điền đầy đủ', 'Error');
      return;
    }

    const file = this.fileTemp
    let foodImageUrl = this.food.food_image;
    if (file) {
      const path = `food/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      foodImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createFoodForm.value, food_image: foodImageUrl};
    this.adminService.updateFood(formData, this.FoodIdUpdate).subscribe({
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
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createFoodForm.get('food_image')!.setValue(file);
      this.fileTemp = file;
    }
  }

  fillFormUpdate(food: Food) {
    this.createFoodForm.setValue({
      food_image: food.food_image,
      food_name: food.food_name,
      category_id: food.category_id,
      price: food.price,
    })
  }
  logout(){
    this.adminService.logout();
  }
}
