import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { UsersService } from 'src/app/services/user.service';
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
    'action'
  ]

  constructor(
    private router: Router,
    private adminService: AdminService,
    private toast: ToastrService,
    private userService:UsersService
  ){}

  ngOnInit(): void {
      this.getUsers();
      // console.log(this.getFood());
  }

  getUsers() {
    this.adminService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.users.sort((a, b) => {
          if (a.updated_at && b.updated_at) {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          } else {
            return 0; 
          }
        });
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

  edit(user_id: string) {
    this.router.navigate(['/admin/update-user', user_id])
  }

  delete(user_id: string, full_name: string) {
    if(confirm(`Bạn có chắc muốn xóa ${full_name} không?`)) {
      this.adminService.deleteUser(user_id).subscribe(res=> {
        this.toast.success(`Xóa thành công`);
        this.getUsers();
      });
    }
  }
  logout(){
    this.adminService.logout();
  }
}
