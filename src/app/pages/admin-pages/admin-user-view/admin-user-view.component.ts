import { Component, OnInit } from '@angular/core';
import {AdminUsersService} from '../../../services/admin/admin-users.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.scss']
})
export class AdminUserViewComponent implements OnInit {



  currentPage: number;
  totalPage: number;
  totalUser: number;
  users: User[];

  arrowLeft: boolean;
  arrowRight: boolean;

  constructor(
    private service: AdminUsersService
  ) {
    this.users = [];
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
  }

  loadContent = () => {
    console.log(this.currentPage);
    this.service.getUsersPagination(this.currentPage).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.users = query.data.getUserPaginationAdmin;
        this.getTotalUser();
        console.log(this.users);
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  getTotalUser = () => {
    this.service.getTotalUser().subscribe(async query => {
      this.totalUser = query.data.getTotalUser;
      this.totalPage = Math.ceil(this.totalUser / 5);
      this.updateControl();
    });
  }

  updateControl(): void {
    if (this.currentPage <= 1) {
      this.arrowLeft = false;
    }
    else {
      this.arrowLeft = true;
    }
    if (this.currentPage >= this.totalPage) {
      this.arrowRight = false;
    }
    else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.currentPage >= this.totalPage) { return; }
    this.currentPage++;
    this.loadContent();
  }

  moveLeft = () => {
    if (this.currentPage < this.totalPage) { return; }
    this.currentPage--;
    this.loadContent();
  }

}
