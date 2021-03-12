import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {MarketService} from '../../../services/market/market.service';
import {TopTransactionItem} from '../../../models/market/top-transaction-item';
import {User} from '../../../models/user';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrls: ['./market-page.component.scss']
})
export class MarketPageComponent implements OnInit {

  currentPage: number;
  totalPage: number;
  totalItemType: number;

  arrowLeft: boolean;
  arrowRight: boolean;

  isUser: boolean;
  user: User;
  topTransactionItemTypes: TopTransactionItem[];

  constructor(
    private authService: AuthService,
    private marketService: MarketService,
  ) {
    this.user = new User();
    this.topTransactionItemTypes = [];
  }

  ngOnInit(): void {
    this.currentPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
    this.authService.getUserAuth().subscribe(async (query) => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, (error) => {
      console.log(error);
      this.isUser = false;
    });
  }

  init(): void {
    this.marketService.getTopTransactionItemTypes(this.currentPage).subscribe(async query => {
      console.log(query);
      this.topTransactionItemTypes = query.data.topTransactionItemTypes;
      console.log(this.topTransactionItemTypes);
    }, error => {
      console.log(error);
    });
  }

  loadContent = () => {
    this.marketService.getTopTransactionItemTypes(this.currentPage).subscribe(async query => {
      if (query.data) {
        this.topTransactionItemTypes = query.data.topTransactionItemTypes;
        this.getTotalTopTransaction();
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  };

  getTotalTopTransaction = () => {
    this.marketService.getTotalTopTransaction().subscribe(async query => {
      this.totalItemType = query.data.getTotalTopTransactionItemTypes;
      this.totalPage = Math.ceil(this.totalItemType / 5);
      this.updateControl();
    });
  };

  updateControl(): void {
    if (this.currentPage <= 1) {
      this.arrowLeft = false;
    } else {
      this.arrowLeft = true;
    }
    if (this.currentPage >= this.totalPage) {
      this.arrowRight = false;
    } else {
      this.arrowRight = true;
    }
  }

  moveRight = () => {
    if (this.currentPage >= this.totalPage) {
      return;
    }
    this.currentPage++;
    this.loadContent();
  };

  moveLeft = () => {
    if (this.currentPage < this.totalPage) {
      return;
    }
    this.currentPage--;
    this.loadContent();
  };
}
