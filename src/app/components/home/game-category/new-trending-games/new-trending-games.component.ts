import {Component, OnInit} from '@angular/core';
import {Game} from '../../../../models/game';
import {GameService} from '../../../../services/home/game.service';

@Component({
  selector: 'app-new-trending-games',
  templateUrl: './new-trending-games.component.html',
  styleUrls: ['./new-trending-games.component.scss']
})
export class NewTrendingGamesComponent implements OnInit {

  games: Game[];
  hoveredGame: Game;
  rows;

  constructor(
    private service: GameService
  ) {
    this.games = [];
    this.rows = [];
    this.hoveredGame = new Game();
  }

  ngOnInit(): void {
    this.service.getNewTrendingGames().subscribe(async query => {
      this.games = query.data.getNewTrendingGame;
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
}
