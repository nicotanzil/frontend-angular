import { Component, OnInit } from '@angular/core';
import {GameService} from '../../services/home/game.service';
import {Game} from '../../models/game';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-discovery-page',
  templateUrl: './discovery-page.component.html',
  styleUrls: ['./discovery-page.component.scss']
})
export class DiscoveryPageComponent implements OnInit {

  recentGames: Game[];
  user: User;
  isUser: boolean;

  constructor(
    private gameService: GameService,
    private authService: AuthService,
  ) {
    this.user = new User();
    this.recentGames = [];
  }

  ngOnInit(): void {
    this.isUser = false;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      console.log(error);
    });
  }

  init(): void {
    this.gameService.getNewTrendingGames().subscribe(async query => {
      this.recentGames = query.data.getNewTrendingGame;
    }, error => {
      console.log(error);
    });
  }

}
