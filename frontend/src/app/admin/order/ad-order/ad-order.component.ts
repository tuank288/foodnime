import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-ad-order',
  templateUrl: './ad-order.component.html',
  styleUrls: ['./ad-order.component.scss']
})
export class AdOrderComponent {
  // public dataSource!: MatTableDataSource<Order>
  // public orders!: Order[]

  // @ViewChild(MatPaginator) paginator!: MatPaginator
  // @ViewChild(MatSort) sort!: MatSort

  //  //Sidebar toggle show hide function
  //  status = false;

  // addToggle()
  // {
  //   this.status = !this.status;
  // }

  // displayedColumns: string[] = [
  //   'order_id',
  //   'full_name',
  //   'address',
  //   'status',
  //   'order_date',
  //   'action'
  // ]

  // constructor(
  //   private router: Router,
  //   private toast: ToastrService,
  //   private adminService:AdminService
  // ){}

  // ngOnInit(): void {
  //     this.getCategory();
  //     // console.log(this.getFood());
  // }

  // getCategory() {
  //   this.adminService.getCategory()
  //     .subscribe(res => {
  //       this.categories = res;
  //       this.dataSource = new MatTableDataSource(this.categories)
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       console.log(this.categories);
  //     })
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // edit(category_id: string) {
  //   this.router.navigate(['/admin/update-category', category_id])
  // }

  // delete(category_id: string) {
  //   if(confirm(`Bạn có chắc muốn xóa thể loại có ID:${category_id} không?`)) {
  //     this.adminService.deleteCategory(category_id).subscribe(res=> {
  //       this.toast.success(`Xóa thành công`);
  //       this.getCategory();
  //     });
  //   }
  // }
}
