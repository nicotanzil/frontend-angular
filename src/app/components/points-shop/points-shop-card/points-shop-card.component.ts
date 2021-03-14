import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-points-shop-card',
  templateUrl: './points-shop-card.component.html',
  styleUrls: ['./points-shop-card.component.scss']
})
export class PointsShopCardComponent implements OnInit {

  @Input() user: User;
  @Input() link: string;
  @Input() name: string;
  @Input() category: string;
  @Input() price: number;

  constructor(
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

}
