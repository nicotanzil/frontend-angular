import {Game} from './game';
import {Item} from './item';

export class ItemType {
  id: number;
  name: string;
  summary: string;
  link: string;
  game: Game = new Game();
  items: Item[] = [];
}
