import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { NgConfirmService } from 'ng-confirm-box';
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
    'food_id',
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
      // console.log(this.getFood());
  }

  getFood() {
    this.adminService.getFood()
      .subscribe(res => {
        this.foods = res;
        this.dataSource = new MatTableDataSource(this.foods)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    
        // console.log(this.foods);
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

  delete(food_id: string) {
    if(confirm(`Bạn có chắc muốn xóa món ăn có ID:${food_id} không?`)) {
      this.adminService.deleteFood(food_id).subscribe(res=> {
        this.toast.success(`Xóa thành công`);
        this.getFood();
      });
    }
  }
}


