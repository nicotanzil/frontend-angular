import { Component, OnInit } from '@angular/core';
import {AdminGamesService} from '../../../services/admin/admin-games.service';
import {Game} from '../../../models/game';
import {log} from 'util';

@Component({
  selector: 'app-admin-game-view',
  templateUrl: './admin-game-view.component.html',
  styleUrls: ['./admin-game-view.component.scss']
})
export class AdminGameViewComponent implements OnInit {

  constructor(
    private gameService: AdminGamesService,
  ) { }

  current: number;
  totalPage: number;
  totalGame: number;
  games: Game[];

  arrowLeft: boolean;
  arrowRight: boolean;

  ngOnInit(): void {
    this.current = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
  }

  loadContent = () => {
    console.log(this.current);
    this.gameService.getGamesPagination(this.current).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.games = query.data.getGamePaginationAdmin;
        this.getTotalGame();
        console.log('Loading games');
        console.log(this.games);
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  getTotalGame = () => {
    this.gameService.getTotalGame().subscribe(async query => {
      this.totalGame = query.data.getTotalGame;
      this.totalPage = Math.ceil(this.totalGame / 5);
      this.updateControl();
    });
  }

  remove(id: number): void {
    console.log('remove');
    this.gameService.removeGame(id).subscribe(async query => {
      console.log(query.data);
      this.loadContent();
    }, error => {
      console.log(error);
    });
  }

  updateControl(): void {
    console.log('current: ' + this.current + ' totalpage: ' + this.totalPage + 'total game: ' + this.totalGame);
    if (this.current <= 1) {
      this.arrowLeft = false;
    }
    else {
      this.arrowLeft = true;
    }
    if (this.current >= this.totalPage) {
      this.arrowRight = false;
    }
    else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.current >= this.totalPage) { return; }
    this.current++;
    this.loadContent();
  }

  moveLeft = () => {
    if (this.current < this.totalPage) { return; }
    this.current--;
    this.loadContent();
  }
}
