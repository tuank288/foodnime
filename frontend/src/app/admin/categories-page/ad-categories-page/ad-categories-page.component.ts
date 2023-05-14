import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-ad-categories-page',
  templateUrl: './ad-categories-page.component.html',
  styleUrls: ['./ad-categories-page.component.scss']
})
export class AdCategoriesPageComponent {

  
  public dataSource!: MatTableDataSource<Tag>
  public categories!: Tag[]

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

  addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'stt',
    'category_image',
    'category_name',
    'created_at',
    'updated_at',
    'action'
  ]

  constructor(
    private router: Router,
    private toast: ToastrService,
    private adminService:AdminService,
    private userService:UsersService
  ){}

  ngOnInit(): void {
      this.getCategory();
      // console.log(this.getFood());
  }

  getCategory() {
    this.adminService.getCategory()
      .subscribe(res => {
        this.categories = res;
        this.categories.forEach((categories, index) => {
          categories.stt = index + 1
        });
        this.dataSource = new MatTableDataSource(this.categories)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(category_id: string) {
    this.router.navigate(['/admin/update-category', category_id])
  }

  delete(category_id: string, category_name: string) {
    if(confirm(`Bạn có chắc muốn xóa ${category_name} không?`)) {
      this.adminService.deleteCategory(category_id).subscribe(res=> {
        this.toast.success(`Xóa thành công`);
        this.getCategory();
      });
    }
  }

  logout(){
    this.userService.logout();
  }

}
