import { Component, OnInit } from '@angular/core';
import {TopSellerGame} from '../../../models/home/top-seller-game';
import {HomeService} from '../../../services/home/home.service';
import {TopReviewGame} from '../../../models/home/top-review-game';

@Component({
  selector: 'app-top-review-game',
  templateUrl: './top-review-game.component.html',
  styleUrls: ['./top-review-game.component.scss']
})
export class TopReviewGameComponent implements OnInit {

  topGames: TopReviewGame[];

  constructor(
    private service: HomeService,
  ) {
    this.topGames = [];
  }

  ngOnInit(): void {
    this.service.getTopReview().subscribe(async query => {
      this.topGames = query.data.getTopReviewGames;
    }, error => {
      console.log(error);
    });
  }

}
