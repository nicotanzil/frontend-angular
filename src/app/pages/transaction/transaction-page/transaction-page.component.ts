import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';
import {CheckoutService} from '../../../services/transaction/checkout.service';
import {NewGift} from '../../../models/transaction/new-gift';
import {CartService} from '../../../services/transaction/cart.service';
import {Game} from '../../../models/game';
import {Router} from '@angular/router';
import {PaymentType} from '../../../models/transaction/payment-type';
import {TransactionHeader} from '../../../models/transaction/transaction-header';
import {Gift} from '../../../models/transaction/gift';
import {TransactionDetail} from '../../../models/transaction/transaction-detail';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent implements OnInit {

  isUser: boolean;
  user: User;
  cartGames: Game[];
  paymentTypes: PaymentType[];
  paymentType: PaymentType;
  paymentTypeId: number;

  gift: Gift;

  transaction: TransactionHeader;
  total: number;

  isConfirmationForm: boolean;

  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private router: Router,
  ) {
    this.user = new User();
    this.cartGames = [];
    this.paymentTypes = [];
    this.paymentType = new PaymentType();
    this.paymentTypeId = 1;

    this.gift = new Gift();

    this.transaction = new TransactionHeader();
    this.total = 0;

    this.isConfirmationForm = false;
  }

  ngOnInit(): void {
    this.isUser = false;
    this.authService.getUserAuth().subscribe(async query => {
      this.user = query.data.getUserAuth;
      this.isUser = true;
      this.init();
    }, error => {
      this.isUser = false;
      console.log(error);
      this.redirectBackToLogin();
    });
  }

  init(): void {
    this.checkoutService.paymentTypes().subscribe(async query => {
      this.paymentTypes = query.data.paymentTypes;
    }, error => {
      console.log(error);
    });
    this.cartService.getCartGamesByUserId(this.user.id).subscribe(async query => {
      // @ts-ignore
      this.cartGames = query.data.getCartGamesByUserId;

      // Add cart games to transaction
      this.addGameToTransaction();

      // Add payment type to transaction
      this.submitPaymentForm();

      // Check if there is a gift not complete. if yes then it's a gift
      this.checkoutService.getGiftBySenderId(this.user.id).subscribe(async res => {
        this.gift = res.data.getGiftBySenderId;
        this.allocateSenderReceiver();
        this.checkConfirmationDialog();
      }, error => {
        // There is no data not -> purchase for self
        this.gift.receiver = this.user;
        this.allocateSenderReceiver();
        this.checkConfirmationDialog();
      });

    }, error => {
      console.log(error);
    });
  }

  redirectBackToLogin(): void {
    if (!this.isUser) {
      this.router.navigateByUrl('/login');
    }
  }

  addGameToTransaction(): void {
    this.cartGames.forEach(game => {
      const transactionDetail = new TransactionDetail();
      transactionDetail.game = game;
      transactionDetail.transactionHeader = this.transaction;
      this.transaction.transactionDetails.push(transactionDetail);
      this.total += game.originalPrice;
    });
    this.transaction.total = this.total;
  }

  allocateSenderReceiver(): void {
    this.transaction.sender = this.gift.sender;
    this.transaction.receiver = this.gift.receiver;
  }

  submitPaymentForm(): void {
    this.getPaymentType(this.paymentTypeId);
    this.transaction.paymentType = this.paymentType;
    this.checkConfirmationDialog();
  }

  checkConfirmationDialog(): void {
    // Check if balance > total
    if (this.user.balance > this.total) {
      // Open confirmation dialog
      this.isConfirmationForm = true;
    } else if (this.paymentType.id !== 1) {
      this.isConfirmationForm = true;
    } else {
      this.isConfirmationForm = false;
    }
  }

  getPaymentType(id: number): void {
    this.paymentTypes.forEach(x => {
      if (x.id === id) {
        this.paymentType = x;
      }
    });
  }
}
