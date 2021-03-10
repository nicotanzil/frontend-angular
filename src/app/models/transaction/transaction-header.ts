import {PaymentType} from './payment-type';
import {User} from '../user';
import {TransactionDetail} from './transaction-detail';

export class TransactionHeader {
  id: number;
  paymentType: PaymentType;
  sender: User = new User();
  receiver: User = new User();
  total: number;
  transactionDetails: TransactionDetail[] = [];
}
