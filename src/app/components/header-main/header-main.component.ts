import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../models/current-user';
import {query} from '@angular/animations';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss']
})
export class HeaderMainComponent implements OnInit {

  constructor(
    private service: AuthService,
    private router: Router,
  ) { }

  isUser: boolean;
  user: User;

  ngOnInit(): void {
    this.service.getUserAuth().subscribe(async (query) => {
      if (query.data.getUserAuth.accountName !== '') {
        // logged in user
        CurrentUser.id = query.data.getUserAuth.id;
        CurrentUser.accountName = query.data.getUserAuth.accountName;
        CurrentUser.profileName = query.data.getUserAuth.profileName;
        CurrentUser.realName = query.data.getUserAuth.realName;
        CurrentUser.email = query.data.getUserAuth.email;
        CurrentUser.balance = query.data.getUserAuth.balance;
        CurrentUser.customUrl = query.data.getUserAuth.customURL;
        CurrentUser.profilePicture = query.data.getUserAuth.profilePicture;

        this.user = CurrentUser;
        this.isUser = true;
        console.log('URL: ' + CurrentUser.accountName);
      }
      else {
        // guest login
        this.isUser = false;
      }
    }, (error) => {
      console.log('There has been an error: ', error);
    });
  }

  logout(): void {
    console.log('Logout');
    this.service.logout().subscribe();
    this.isUser = false;

    this.router.navigateByUrl('/login');
  }
}
