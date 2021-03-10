import {TransactionHeader} from './transaction-header';
import {Game} from '../game';

export class TransactionDetail {
  transactionHeader: TransactionHeader = new TransactionHeader();
  game: Game = new Game();
}
