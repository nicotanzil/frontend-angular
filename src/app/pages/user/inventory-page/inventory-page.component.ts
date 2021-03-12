import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Game} from '../../../models/game';
import {ItemService} from '../../../services/user/item.service';
import {Item} from '../../../models/item';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {ItemTransactionService} from '../../../services/transaction/item-transaction.service';
import {ItemTransaction} from '../../../models/transaction/item-transaction';
import {MarketService} from '../../../services/market/market.service';

@Component({
  selector: 'app-inventory-page',
  templateUrl: './inventory-page.component.html',
  styleUrls: ['./inventory-page.component.scss']
})
export class InventoryPageComponent implements OnInit {

  userUrl: string;
  user: User;
  authUser: User;
  isAuth: boolean;
  isOwnInventory: boolean;

  itemCategory: Game[];
  selectedCategory: Game;

  searchKeyword: string;

  currentPage: number;
  totalPage: number;
  totalItem: number;
  items: Item[];
  selectedItem: Item;
  isModal: boolean;

  keyword: string;

  arrowLeft: boolean;
  arrowRight: boolean;

  transactions: ItemTransaction[];

  receive: number;
  pay: number;

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  constructor(
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private itemService: ItemService,
    private transactionService: ItemTransactionService,
    private marketService: MarketService,
  ) {
    this.user = new User();
    this.authUser = new User();
    this.isAuth = false;
    this.isOwnInventory = false;

    this.itemCategory = [];
    this.selectedCategory = new Game();

    this.items = [];
    this.selectedItem = new Item();
    this.isModal = false;

    this.keyword = '';

    this.transactions = [];

    this.receive = 0;
    this.pay = 0;
  }

  ngOnInit(): void {
    this.isAuth = false;
    this.userUrl = this.actRoute.snapshot.params.url;
    this.authService.getUserAuth().subscribe(async query => {
      this.authUser = query.data.getUserAuth;
      this.isAuth = true;
      this.init();
    }, error => {
      this.isAuth = false;
      console.log(error);
    });

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        console.log(event.target);
        return event.target.value;
      })
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((keyword: string) => {
      console.log(keyword);
      if (keyword.length > 0) {
        this.keyword = keyword;
        this.initPagination();
      } else {
        this.keyword = '';
        this.initPagination();
      }
    });

  }

  init(): void {
    this.userService.getUserByUrl(this.userUrl).subscribe(async query => {
      if (query.data) {
        this.user = query.data.getUserByUrl;
        if (this.isAuth && this.authUser.id === this.user.id) {
          this.isOwnInventory = true;
        }
        this.getItemCategory();
      }
    }, error => {
      console.log(error);
    });
  }

  initPagination(): void {
    this.items = [];
    this.currentPage = 1;
    this.arrowLeft = true;
    this.arrowRight = true;
    this.loadContent();
  }

  loadContent = () => {
    this.itemService.getItemsPaginate(this.user.id, this.selectedCategory.id, this.currentPage, this.keyword).subscribe(async query => {
      if (query.data) {
        this.items = query.data.itemsPaginate;
        this.selectedItem = this.items[0];
        this.getTotalItems();
        this.updateControl();
      }
    }, error => {
      console.log('Error: ' + error);
    });
  };

  getTotalItems = () => {
    this.itemService.getTotalItems(this.user.id, this.selectedCategory.id, this.keyword).subscribe(async query => {
      this.totalItem = query.data.getTotalItems;
      this.totalPage = Math.ceil(this.totalItem / 20);
      this.updateControl();
    });
  };

  getItemCategory(): void {
    this.itemService.getItemCategoriesByUser(this.user.id).subscribe(async query => {
      this.itemCategory = query.data.getItemCategoriesByUser;
      this.selectedCategory = this.itemCategory[0];
      this.initPagination();
    }, error => {
      console.log(error);
    });
  }

  changeCategory(index: number): void {
    this.selectedCategory = this.itemCategory[index];
    this.initPagination();
  }

  changeItem(index: number): void {
    this.selectedItem = this.items[index];
    this.loadGraph();
  }

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
  }

  moveLeft = () => {
    this.currentPage--;
    this.loadContent();
  }

  loadGraph(): void {
    this.transactionService.getPreviousTransactionData(this.selectedItem.id).subscribe(async query => {
      console.log(query);
      this.transactions = query.data.getPreviousTransactionData;
      console.log(this.transactions);
    }, error => {
      console.log(error);
    });
  }

  updatePay(): void {
    this.pay = this.receive + this.receive * 0.1;
    console.log(this.pay);
  }

  updateReceive(): void {
    this.receive = this.pay - (this.pay * 0.1);
  }

  addToSellListing(): void {
    this.marketService.createSellListing(this.selectedItem.id, this.receive).subscribe(async query => {
      // @ts-ignore
      const res = query.data.createSellListing;
      if (res) {
        alert('Item added to Sell List');
      } else {
        alert('Item has already in the Sell List');
      }
    }, error => {
      console.log(error);
    });
  }
}
