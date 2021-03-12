import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {MarketService} from '../../../services/market/market.service';

@Component({
  selector: 'app-market-detail-page',
  templateUrl: './market-detail-page.component.html',
  styleUrls: ['./market-detail-page.component.scss']
})
export class MarketDetailPageComponent implements OnInit {

  isUser: boolean;
  user: User;

  constructor(
    private authService: AuthService,
    private marketService: MarketService,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

}
