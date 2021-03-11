import { Component, OnInit } from '@angular/core';
import {HomeService} from '../../../services/home/home.service';
import {TopSellerGame} from '../../../models/home/top-seller-game';

@Component({
  selector: 'app-top-seller-game',
  templateUrl: './top-seller-game.component.html',
  styleUrls: ['./top-seller-game.component.scss']
})
export class TopSellerGameComponent implements OnInit {

  topGames: TopSellerGame[];

  constructor(
    private service: HomeService,
  ) {
    this.topGames = [];
  }

  ngOnInit(): void {
    this.service.getTopSeller().subscribe(async query => {
      this.topGames = query.data.getTopSellerGames;
    }, error => {
      console.log(error);
    });
  }
}
