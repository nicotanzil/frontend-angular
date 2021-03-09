import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {NewGift} from '../../../models/transaction/new-gift';
import {CheckoutService} from '../../../services/transaction/checkout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gift-page',
  templateUrl: './gift-page.component.html',
  styleUrls: ['./gift-page.component.scss']
})
export class GiftPageComponent implements OnInit {

  isUser: boolean;
  user: User;

  friendId: number;
  firstName: string;
  message: string;
  sentiment: string;
  signature: string;

  insertGift: NewGift;

  constructor(
    private router: Router,
    private authService: AuthService,
    private checkoutService: CheckoutService,
  ) {
    this.user = new User();
    this.insertGift = new NewGift();
  }

  ngOnInit(): void {
    this.isUser = false;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      console.log(this.user);
      this.isUser = true;
    }, error => {
      this.isUser = false;
      console.log(error);
    });
  }

  submit(): void {
    this.insertGift.senderId = this.user.id;
    this.insertGift.receiverId = this.friendId;
    this.insertGift.firstName = this.firstName;
    this.insertGift.message = this.message;
    this.insertGift.sentiment = this.sentiment;
    this.insertGift.signature = this.signature;
    this.checkoutService.createGift(this.insertGift).subscribe(async query => {
      this.router.navigateByUrl('/checkout');
    }, error => {
      console.log(error);
    });
  }

}
