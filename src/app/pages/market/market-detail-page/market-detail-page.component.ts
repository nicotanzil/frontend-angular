import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {MarketService} from '../../../services/market/market.service';
import {ActivatedRoute} from '@angular/router';
import {GraphData} from '../../../models/market/graph-data';
import {ItemTransactionService} from '../../../services/transaction/item-transaction.service';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import {ItemType} from '../../../models/item-type';
import {forkJoin} from 'rxjs';
import {BuyListing} from '../../../models/market/buy-listing';
import {SellListing} from '../../../models/market/sell-listing';
import {HighestBuyListing} from '../../../models/market/highest-buy-listing';
import {LowestSellListing} from '../../../models/market/lowest-sell-listing';
import {Bid} from '../../../models/market/bid';

@Component({
  selector: 'app-market-detail-page',
  templateUrl: './market-detail-page.component.html',
  styleUrls: ['./market-detail-page.component.scss']
})
export class MarketDetailPageComponent implements OnInit {

  isAuth: boolean;
  user: User;
  itemTypeId: number;
  itemType: ItemType;
  graphDatas: GraphData[];

  prices: number[];
  dates: any[];

  graphReady: boolean;

  buyListings: BuyListing[];
  sellListings: SellListing[];

  highestBuyListings: HighestBuyListing[];
  lowestSellListings: LowestSellListing[];

  isBuyModal: boolean;

  buy: number;
  newBid: Bid;

  mySellListings: SellListing[];
  myBuyListings: BuyListing[];

  constructor(
    private actRoute: ActivatedRoute,
    private authService: AuthService,
    private marketService: MarketService,
    private transactionService: ItemTransactionService,
  ) {
    this.user = new User();
    this.graphDatas = [];
    this.itemType = new ItemType();

    this.prices = [];
    this.dates = [];
    this.graphReady = false;

    this.buyListings = [];
    this.sellListings = [];

    this.highestBuyListings = [];
    this.lowestSellListings = [];

    this.isBuyModal = false;
    this.newBid = new Bid();

    this.mySellListings = [];
    this.myBuyListings = [];
  }

  ngOnInit(): void {
    this.isAuth = false;
    this.itemTypeId = this.actRoute.snapshot.params.id;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isAuth = true;
      this.init();
    }, error => {
      this.isAuth = false;
      console.log(error);
    });
  }

  init(): void {
    forkJoin(
      this.marketService.getItemType(this.itemTypeId),
      this.transactionService.getPreviousTransactionData(this.itemTypeId),
      this.marketService.getSellListingsByUser(this.user.id, this.itemTypeId),
      this.marketService.getBuyListingsByUser(this.user.id, this.itemTypeId),
    ).subscribe(res => {
      this.itemType = res[0].data.getItemType;
      this.graphDatas = res[1].data.getPreviousTransactionData;
      this.mySellListings = res[2].data.getSellListingsByUser;
      this.myBuyListings = res[3].data.getBuyListingsByUser;
      this.fetchBidSellData();
    }, error => {
      console.log(error);
    });
  }

  fetchBidSellData(): void {

    this.marketService.getHighestBuyListings(this.itemTypeId).valueChanges.subscribe(async query => {
      this.highestBuyListings = query.data.getBuyListingsData;
      console.log(this.highestBuyListings);
    }, error => {
      console.log(error);
    });

    this.marketService.getLowestSellListings(this.itemTypeId).valueChanges.subscribe(async query => {
      this.lowestSellListings = query.data.getSellListingsData;
      console.log(this.lowestSellListings);
    }, error => {
      console.log(error);
    });
  }

  createBuyListing(): void {
    console.log(this.itemTypeId);
    console.log(this.user.id);
    this.marketService.createBid(this.itemTypeId, this.user.id).subscribe(async query => {
      // @ts-ignore
      this.newBid = query.data.createBid;
      this.marketService.createBuyListing(this.newBid.id, this.buy).subscribe(async res => {
        // @ts-ignore
        if (res.data.createBuyListing) {
          alert('Buy Listing Successful!');
        } else {
          alert('Oops, something went wrong!');
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);
    });
  }

}
