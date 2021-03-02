import {Component, OnInit} from '@angular/core';
import {Game} from '../../../../models/game';
import {GameService} from '../../../../services/home/game.service';

@Component({
  selector: 'app-special-games',
  templateUrl: './special-games.component.html',
  styleUrls: ['./special-games.component.scss']
})
export class SpecialGamesComponent implements OnInit {

  games: Game[];
  filteredGame: Game[];
  hoveredGame: Game;
  rows;

  constructor(
    private service: GameService,
  ) {
    this.games = [];
    this.filteredGame = [];
    this.rows = [];
    this.hoveredGame = new Game();
  }

  ngOnInit(): void {
    this.service.getSpecialOfferGames().subscribe(async query => {
      this.games = query.data.getSpecialOfferGame;
      this.filterGame();
      this.rowsInit();
    }, error => {
      console.log(error);
    });
  }

  filterGame(): void {
    this.games.forEach(game => {
      if (game.promo.discountPercentage >= 50) {
        this.filteredGame.push(game);
      }
    });
  }

  rowsInit(): void {
    let x = true;
    this.filteredGame.forEach(game => {
      if (x) {
        this.rows[game.id] = true;
        this.updateOverview(game.id);
      } else {
        this.rows[game.id] = false;
      }
      x = false;
    });
  }

  updateOverview(gameId: number): void {
    this.filteredGame.forEach(game => {
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
