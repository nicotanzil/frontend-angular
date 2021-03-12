import {Game} from './game';
import {User} from './user';
import {ItemType} from './item-type';

export class Item {
  id: number;
  itemType: ItemType = new ItemType();
  user: User = new User();
}
