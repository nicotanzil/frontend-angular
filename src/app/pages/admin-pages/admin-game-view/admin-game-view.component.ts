import { Component, OnInit } from '@angular/core';
import {AdminGamesService} from '../../../services/admin/admin-games.service';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-admin-game-view',
  templateUrl: './admin-game-view.component.html',
  styleUrls: ['./admin-game-view.component.scss']
})
export class AdminGameViewComponent implements OnInit {

  constructor(
    private gameService: AdminGamesService,
  ) { }

  currentPage: number;
  totalPage: number;
  totalGame: number;
  games: Game[];

  arrowLeft: boolean;
  arrowRight: boolean;

  ngOnInit(): void {
    this.currentPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
  }

  loadContent = () => {
    console.log(this.currentPage);
    this.gameService.getGamesPagination(this.currentPage).subscribe(async query => {
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
    if (confirm('Are you sure you want to delete?')) {
      this.gameService.removeGame(id).subscribe(async query => {
        console.log(query.data);
        this.loadContent();
      }, error => {
        console.log(error);
      });
    }
  }

  updateControl(): void {
    if (this.currentPage <= 1) {
      this.arrowLeft = false;
    }
    else {
      this.arrowLeft = true;
    }
    if (this.currentPage >= this.totalPage) {
      this.arrowRight = false;
    }
    else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.currentPage >= this.totalPage) { return; }
    this.currentPage++;
    this.loadContent();
  }

  moveLeft = () => {
    if (this.currentPage < this.totalPage) { return; }
    this.currentPage--;
    this.loadContent();
  }
}
