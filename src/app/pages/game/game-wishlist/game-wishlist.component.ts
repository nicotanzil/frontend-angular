import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {Game} from '../../../models/game';
import {AuthService} from '../../../services/auth.service';
import {WishlistService} from '../../../services/transaction/wishlist.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game-wishlist',
  templateUrl: './game-wishlist.component.html',
  styleUrls: ['./game-wishlist.component.scss']
})
export class GameWishlistComponent implements OnInit {

  isUser: boolean;
  user: User;
  games: Game[];
  estimatedTotal: number;

  constructor(
    private router: Router,
    private authService: AuthService,
    private wishlistService: WishlistService,
  ) {
    this.user = new User();
    this.games = [];
    this.estimatedTotal = 0;
  }

  ngOnInit(): void {
    this.authService.getUserAuth().subscribe(async (query) => {
      if (query.data.getUserAuth.accountName !== '') {
        this.user = query.data.getUserAuth;
        this.isUser = true;
        this.init();
      }
      else {
        // guest login
        this.isUser = false;
        this.redirectBackToLogin();
      }
    }, (error) => {
      console.log(error);
      this.isUser = false;
      this.redirectBackToLogin();
    });
  }

  init(): void {
    this.wishlistService.getWishlistGamesByUserId(this.user.id).subscribe(async query => {
      // @ts-ignore
      this.games = query.data.getWishlistByUserId;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.games.forEach(game => {
      this.estimatedTotal += (game.originalPrice - (game.originalPrice * game.promo.discountPercentage / 100));
    });
  }

  remove(gameId: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.wishlistService.removeGameFromWishlist(gameId, this.user.id).subscribe(async query => {
        alert('Item removed from wishlist!');
      });
    }
  }

  redirectBackToLogin(): void {
    if (!this.isUser) {
      this.router.navigateByUrl('/login');
    }
  }
}
