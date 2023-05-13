import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { Food } from 'src/app/shared/models/Food';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-ad-user-page',
  templateUrl: './ad-user-page.component.html',
  styleUrls: ['./ad-user-page.component.scss']
})
export class AdUserPageComponent {
  public dataSource!: MatTableDataSource<User>
  public users!: User[]

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
    'full_name',
    'email',
    'phone_number',
    'address',
    'role',
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
      this.getUsers();
      // console.log(this.getFood());
  }

  getUsers() {
    this.adminService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.users.forEach((user, index) => {
          user.stt = index + 1;
        })
        this.dataSource = new MatTableDataSource(this.users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.users);
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
    this.router.navigate(['/admin/update-user', food_id])
  }

  delete(food_id: string) {
    if(confirm(`Bạn có chắc muốn xóa người dùng có ID:${food_id} không?`)) {
      this.adminService.deleteUser(food_id).subscribe(res=> {
        this.toast.success(`Xóa thành công`);
        this.getUsers();
      });
    }
  }
}
