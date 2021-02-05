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

  current: number;
  totalPage: number;
  games: Game[];

  ngOnInit(): void {
    this.current = 1;
    // this.totalPage = this.games.length;
  }
}
