import {Component, OnInit} from '@angular/core';
import {TopSellerGame} from '../../../../models/home/top-seller-game';
import {Game} from '../../../../models/game';
import {GameService} from '../../../../services/home/game.service';
import {HomeService} from '../../../../services/home/home.service';

@Component({
  selector: 'app-top-seller-games',
  templateUrl: './top-seller-games.component.html',
  styleUrls: ['./top-seller-games.component.scss']
})
export class TopSellerGamesComponent implements OnInit {

  topSellerGames: TopSellerGame[];
  games: Game[];
  hoveredGame: Game;
  rows;

  ids: number[];
  purchaseCount: number;

  constructor(
    private gameService: GameService,
    private homeService: HomeService,
  ) {
    this.topSellerGames = [];
    this.games = [];
    this.rows = [];
    this.hoveredGame = new Game();
    this.ids = [];
  }

  ngOnInit(): void {
    // Load all top seller games
    this.homeService.getTopSeller().subscribe(async query => {
      this.topSellerGames = query.data.getTopSellerGames;
      this.initGame();
    }, error => {
      console.log(error);
    });
  }

  initGame(): void {
    // Get the complete games data from top seller game id
    this.topSellerGames.forEach(g => {
      this.ids.push(g.game_id);
    });
    this.gameService.getGamesByMultipleId(this.ids).subscribe(async query => {
      this.games = query.data.gameByMultipleId;
      this.rowsInit();
    }, error => {
      console.log(error);
    });
  }

  rowsInit(): void {
    let x = true;
    this.games.forEach(game => {
      if (x) {
        this.rows[game.id] = true;
        this.updateOverview(game.id);
      }else {
        this.rows[game.id] = false;
      }
      x = false;
    });
  }

  updateOverview(gameId: number): void {
    this.games.forEach(game => {
      if (game.id === gameId) {
        this.hoveredGame = game;
        this.getGamePurchaseCount();
      }
    });
  }

  onHover(rowId): void {
    Object.keys(this.rows).forEach(key => {
      // tslint:disable-next-line:triple-equals
      if (key == rowId) {
        this.rows[key] = true;
        this.updateOverview(rowId);
      } else {
        this.rows[key] = false;
      }
    });
  }

  getGamePurchaseCount(): void {
    this.topSellerGames.forEach(g => {
      // tslint:disable-next-line:triple-equals
      if (g.game_id == this.hoveredGame.id) {
        this.purchaseCount = g.purchase_count;
      }
    });
  }
}
