import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {CurrentUser} from '../../models/current-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: AuthService,
  ) { }

  isUser: boolean;
  user: User;

  ngOnInit(): void {
    this.service.getUserAuth().subscribe(async (query) => {
      if (query.data.getUserAuth.accountName !== '') {
        // logged in user
        console.log(query.data);
        CurrentUser.id = query.data.getUserAuth.id;
        CurrentUser.accountName = query.data.getUserAuth.accountName;
        CurrentUser.profileName = query.data.getUserAuth.profileName;
        CurrentUser.realName = query.data.getUserAuth.realName;
        CurrentUser.email = query.data.getUserAuth.email;
        CurrentUser.balance = query.data.getUserAuth.balance;
        CurrentUser.customUrl = query.data.getUserAuth.customURL;
        CurrentUser.avatar = query.data.getUserAuth.avatar;
        CurrentUser.profileBackground = query.data.getUserAuth.profileBackground;

        this.user = CurrentUser;
        this.isUser = true;
      }
      else {
        // guest login
        this.isUser = false;
      }
    }, (error) => {
      console.log('There has been an error: ', error);
      console.log(error);
    });
  }

}
