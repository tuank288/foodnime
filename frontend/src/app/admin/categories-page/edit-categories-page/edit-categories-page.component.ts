import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Food } from 'src/app/shared/models/Food';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-edit-categories-page',
  templateUrl: './edit-categories-page.component.html',
  styleUrls: ['./edit-categories-page.component.scss']
})
export class EditCategoriesPageComponent {
  status = false;

  createCategoryForm!: FormGroup;
  CategoryIdUpdate!: string;
  public isUpdateActive: boolean = false;
  category!: Tag;

  addToggle()
 {
   this.status = !this.status;
 }

 constructor(
  private fb: FormBuilder,
  private adminService: AdminService,
  private router: Router,
  private toast: ToastrService,
  private activatedRouter: ActivatedRoute
  ) {}

  category_image = new FormControl('',[Validators.required]);
  category_name = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createCategoryForm = this.fb.group({
      category_image: this.category_image,
      category_name: this.category_name,
    })

    // this.foodService.getAllTag().subscribe(categories => this.categories = categories);

    this.activatedRouter.params.subscribe( val => {
      this.CategoryIdUpdate = val['categoryId'];
      if (val && val['categoryId']) {
        this.adminService.getCategorydId(this.CategoryIdUpdate).subscribe( res => {
          this.isUpdateActive = true;
          this.fillFormUpdate(res);
          this.category = res;
      })
    }  
    })
  
  }

  submit() {
    this.adminService.postCategory(this.createCategoryForm.value).subscribe({
      next: res => {
        this.toast.success(`Tạo thành công`);
        console.log(this.createCategoryForm);
        
        this.createCategoryForm.reset();
        this.router.navigate(['admin/ad-categories']);
    }, error: err => {
      this.toast.error(`Tạo thất bại`);
      console.log(err);
      }
    })
  }

  update() {
    this.adminService.updateCategory(this.createCategoryForm.value, this.CategoryIdUpdate).subscribe({
      next: res => {
        this.toast.success(`Cập nhật thành công`);
        this.createCategoryForm.reset();
        this.router.navigate(['admin/ad-categories']);
    }, error: err => {
      this.toast.error(`Cập nhật thất bại`)
      this.createCategoryForm.markAllAsTouched();
      console.error(err);
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileName = file.name;
    this.createCategoryForm.get('category_image')!.setValue(fileName);
  }

  fillFormUpdate(category: Tag) {
    this.createCategoryForm.setValue({
      category_image: category.category_image,
      category_name: category.category_name,
    })
  }
}
