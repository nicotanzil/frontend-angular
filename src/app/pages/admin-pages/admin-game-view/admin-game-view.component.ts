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
  games: Game[];

  arrowLeft: boolean;
  arrowRight: boolean;

  ngOnInit(): void {
    this.current = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    // this.totalPage = this.games.length;
    this.gameService.getGamesPagination(this.current).subscribe(async query => {
      console.log(query.data);
      if (query.data) {
        this.games = query.data.getGamePaginationAdmin;
        this.totalPage = Math.floor(this.games.length / 5 + 1);
        console.log('Loading games');
        console.log(this.games);
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  remove(id: number): void {
    this.gameService.removeGame(id).subscribe(async query => {
      console.log(query.data);
    }, error => {
      console.log(error);
    });
  }

  updateControl(): void {
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
}
