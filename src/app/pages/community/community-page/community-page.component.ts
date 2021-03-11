import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  profileUser: User;
  user: User;
  isUser: boolean;

  buttons = {
    artworkBtn: true,
    reviewsBtn: false,
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.profileUser = new User();
    this.user = new User();
    this.isUser = false;
  }

  ngOnInit(): void {
    this.isUser = false;
    this.profileUser = new User();
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
    }, error => {
      this.isUser = false;
      console.log(error);
    });
  }

  onClick(buttonId): void {
    Object.keys(this.buttons).forEach(key => {
      if (key === buttonId) {
        this.buttons[key] = true;
      } else {
        this.buttons[key] = false;
      }
    });
  }
}
