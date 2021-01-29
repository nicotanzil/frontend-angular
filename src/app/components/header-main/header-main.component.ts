import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  constructor() { }

  user: User;
  isUser: boolean;

  ngOnInit(): void {
    this.isUser = false;
  }

  Logout(): void {
    localStorage.removeItem('access_token');
  }

}
