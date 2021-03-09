import {Game} from '../game';
import {User} from '../user';
import {GameDiscussionReply} from './game-discussion-reply';

export class GameDiscussion {
  id: number;
  title: string;
  description: string;
  game: Game = new Game();
  user: User = new User();
  replies: GameDiscussionReply[] = [];
}
