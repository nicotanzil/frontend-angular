import {Game} from './game';
import {User} from './user';

export class Item {
  id: number;
  name: string;
  summary: string;
  link: string;
  game: Game = new Game();
  users: User[] = [];
}
