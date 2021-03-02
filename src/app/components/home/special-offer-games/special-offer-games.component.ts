import { Component, OnInit } from '@angular/core';
import {GameService} from '../../../services/home/game.service';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-special-offer-games',
  templateUrl: './special-offer-games.component.html',
  styleUrls: ['./special-offer-games.component.scss']
})
export class SpecialOfferGamesComponent implements OnInit {

  games: Game[];

  constructor(
    private service: GameService
  ) {
    this.games = [];
  }

  ngOnInit(): void {
    this.service.getSpecialOfferGames().subscribe(async query => {
      this.games = query.data.getSpecialOfferGame;
    }, error => {
      console.log(error);
    });
  }
}
