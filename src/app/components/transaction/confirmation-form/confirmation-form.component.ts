import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/user';
import {PaymentType} from '../../../models/transaction/payment-type';
import {TransactionHeader} from '../../../models/transaction/transaction-header';
import {InputHeaderTransaction} from '../../../models/transaction/input-header-transaction';
import {CheckoutService} from '../../../services/transaction/checkout.service';

@Component({
  selector: 'app-confirmation-form',
  templateUrl: './confirmation-form.component.html',
  styleUrls: ['./confirmation-form.component.scss']
})
export class ConfirmationFormComponent implements OnInit, OnChanges {

  @Input() user: User;
  @Input() paymentType: PaymentType;
  @Input() transaction: TransactionHeader;

  inputTransaction: InputHeaderTransaction;

  constructor(
    private service: CheckoutService,
  ) {
    this.user = new User();
    this.paymentType = new PaymentType();
    this.transaction = new TransactionHeader();
    this.inputTransaction = new InputHeaderTransaction();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.user);
    console.log(this.paymentType);
    console.log(this.transaction);
  }

  confirmTransaction(): void {
    console.log(this.transaction);
    this.inputTransaction.paymentTypeId = this.transaction.paymentType.id;
    this.inputTransaction.senderId = this.transaction.sender.id;
    this.inputTransaction.receiverId = this.transaction.receiver.id;
    this.inputTransaction.total = this.transaction.total;
    this.transaction.transactionDetails.forEach(value => {
      this.inputTransaction.transactionDetails.push(value.game.id);
    });
    if (this.inputTransaction.senderId === undefined) {
      this.inputTransaction.senderId = this.user.id;
    }
    console.log(this.inputTransaction); // don't remove code
    this.service.createTransaction(this.inputTransaction).subscribe(async query => {
      // @ts-ignore
      if (query.data.createTransaction) {
        alert('Purchase Success!');
      }
      else {
        alert('Oops, something went wrong!');
      }
    }, error => {
      console.log(error);
    });
  }
}
