import {Item} from '../item';
import {User} from '../user';

export class ItemTransaction {
  id: number;
  item: Item = new Item();
  seller: User = new User();
  buyer: User = new User();
  price: number;
  createdAt: Date;
}
