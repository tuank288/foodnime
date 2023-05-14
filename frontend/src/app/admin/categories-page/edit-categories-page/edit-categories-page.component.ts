import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Tag } from 'src/app/shared/models/Tag';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-categories-page',
  templateUrl: './edit-categories-page.component.html',
  styleUrls: ['./edit-categories-page.component.scss']
})
export class EditCategoriesPageComponent {
  status = false;

  fileTemp: any;
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
  private activatedRouter: ActivatedRoute,
  private fireStogre: AngularFireStorage,
  private userService:UsersService
  ) {}

  category_image = new FormControl('',[Validators.required]);
  category_name = new FormControl('',[Validators.required]);

  ngOnInit() {
    this.createCategoryForm = this.fb.group({
      category_image: this.category_image,
      category_name: this.category_name,
    })

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

  async submit() {

    const file = this.createCategoryForm.get('category_image')?.value;
  
    let categoryImageUrl = '';
    if (file) {
      const path = `categories/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      categoryImageUrl = await upload.ref.getDownloadURL();
    }
    const formData = {...this.createCategoryForm.value, category_image: categoryImageUrl};
    console.log(formData);
    
    this.adminService.postCategory(formData).subscribe({
      next: res => {
        this.toast.success(`Tạo thành công`);
        console.log(this.createCategoryForm);
        
        this.createCategoryForm.reset();
        return this.router.navigate(['admin/ad-categories']);
    }, error: err => {
        console.log(err);
        return this.toast.error(err.error,`Tạo thất bại`);
      }
    })
  }

  async update() {
    if (!this.createCategoryForm.valid) {
      this.createCategoryForm.markAllAsTouched();
      this.toast.error('Xin vui lòng điền đầy đủ', 'Error');
      return;
    }
    const file = this.fileTemp
    let categoryImageUrl = this.category.category_image;

    if(file){
      const path = `categories/${file.name}`;
      const upload = await this.fireStogre.upload(path, file);
      categoryImageUrl = await upload.ref.getDownloadURL();     
    }
    const formData = {...this.createCategoryForm.value, category_image: categoryImageUrl};
    this.adminService.updateCategory(formData, this.CategoryIdUpdate).subscribe({
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
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.createCategoryForm.get('category_image')!.setValue(file);
      this.fileTemp = file;
    }
  }

  fillFormUpdate(category: Tag) {
    this.createCategoryForm.setValue({
      category_image: category.category_image,
      category_name: category.category_name,
    }) 
  }
  logout(){
    this.userService.logout();
  }
}
