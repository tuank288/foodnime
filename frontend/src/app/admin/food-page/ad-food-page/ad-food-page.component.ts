import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { Food } from 'src/app/shared/models/Food';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-ad-food-page',
  templateUrl: './ad-food-page.component.html',
  styleUrls: ['./ad-food-page.component.scss']
})
export class AdFoodPageComponent implements OnInit {

  public dataSource!: MatTableDataSource<Food>
  public foods!: Food[]

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
    'food_image',
    'food_name',
    'category_name',
    'price',
    'created_at',
    'updated_at',
    'action'
  ]

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toast: ToastrService,
  ){}

  ngOnInit(): void {
      this.getFood();
  }

  getFood() {
    this.adminService.getFood()
      .subscribe(res => {
        this.foods = res;
        this.foods.forEach((food, index) => {
          food.stt = index + 1; // Tạo biến stt và gán giá trị
        });
        this.dataSource = new MatTableDataSource(this.foods)
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

  edit(food_id: string) {
    this.router.navigate(['/admin/update-food', food_id])
  }

  delete(food_id: string, food_name: string) {
    if(confirm(`Bạn có chắc muốn xóa ${food_name.replace(/\s+/g, ' ').trim()} không?`)) {
      this.adminService.deleteFood(food_id).subscribe(res=> {
        this.toast.success(`Xóa thành công`);
        this.getFood();
      });
    }
  }

  getDisplayedIndex(index: number): number {
    if (this.dataSource.paginator) {
      return index + 1 + this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;
    } else {
      return index + 1;
    }
  }
}


