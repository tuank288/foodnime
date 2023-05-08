import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-ad-order',
  templateUrl: './ad-order.component.html',
  styleUrls: ['./ad-order.component.scss']
})
export class AdOrderComponent {
  public dataSource!: MatTableDataSource<Order>
  public orders!: Order[];

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

   //Sidebar toggle show hide function
   status = false;

  addToggle()
  {
    this.status = !this.status;
  }

  displayedColumns: string[] = [
    'order_id',
    'order_date',
    'full_name',
    'phone_number',
    'email',
    'address',
    'status',
    'action'
  ]

  constructor(
    private adminService:AdminService,
  ){}

  ngOnInit(): void {
      this.getOrders();
      // console.log(this.getFood()); 
  }

  getOrders() {
    this.adminService.getOrders()
      .subscribe(res => {
        this.orders = res;
        this.dataSource = new MatTableDataSource(this.orders)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(this.orders);
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusColor(status: string) {
    switch(status) {
      case 'PAYED':
        return 'green';
      case 'SHIPPED':
        return 'rgb(199, 202, 56)';
      case 'CANCELLED':
        return 'red';
      default:
        return 'black';
    }
  }
}
