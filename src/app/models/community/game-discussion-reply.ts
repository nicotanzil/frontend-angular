import {GameDiscussion} from './game-discussion';
import {User} from '../user';

export class GameDiscussionReply {
  id: number;
  description: string;
  discussion: GameDiscussion = new GameDiscussion();
  user: User = new User();
}
