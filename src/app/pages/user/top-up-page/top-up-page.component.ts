import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-top-up-page',
  templateUrl: './top-up-page.component.html',
  styleUrls: ['./top-up-page.component.scss']
})
export class TopUpPageComponent implements OnInit {

  user: User;
  isUser: boolean;

  code: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.user = new User();
    this.isUser = false;
  }

  ngOnInit(): void {
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
    }, error => {
      this.isUser = false;
      console.log(error);
    });
  }

  redeemCode(): void {
    this.userService.redeemCode(this.code, this.user.id).subscribe(async query => {
      console.log(query);
      // @ts-ignore
      if (query.data.redeemCode) {
        alert('Wallet added!');
      } else {
        alert('Invalid code!');
      }
    }, error => {
      console.log(error);
      alert('Invalid code!');
    });
  }

}
