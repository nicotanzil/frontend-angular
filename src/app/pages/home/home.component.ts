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

  isUser: boolean;
  user: User;

  constructor(
    private service: AuthService,
  ) {
    this.user = new User();
  }


  ngOnInit(): void {
    this.service.getUserAuth().subscribe(async (query) => {
      console.log(query);
      if (query.data.getUserAuth.accountName !== '') {
        this.user = query.data.getUserAuth;
        console.log(this.user);
        this.isUser = true;
      }
      else {
        // guest login
        this.isUser = false;
      }
    }, (error) => {
      console.log(error);
      this.isUser = false;
    });
  }
}
