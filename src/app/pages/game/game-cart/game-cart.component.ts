import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {SearchGameService} from '../../../services/home/search-game/search-game.service';
import {Game} from '../../../models/game';
import {CartService} from '../../../services/transaction/cart.service';

@Component({
  selector: 'app-game-cart',
  templateUrl: './game-cart.component.html',
  styleUrls: ['./game-cart.component.scss']
})
export class GameCartComponent implements OnInit {

  isUser: boolean;
  user: User;
  games: Game[];
  estimatedTotal: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
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
      }
    }, (error) => {
      console.log(error);
      this.isUser = false;
    });
  }

  init(): void {
    this.cartService.getCartGamesByUserId(this.user.id).subscribe(async query => {
      // @ts-ignore
      this.games = query.data.getCartGamesByUserId;
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
      this.cartService.removeGameFromCart(gameId, this.user.id).subscribe(async query => {
        alert('Item removed from cart!');
      });
    }
  }
}
