import {User} from '../user';
import {Game} from '../game';
import {CommunityGameReviewComment} from './community-game-review-comment';

export class CommunityGameReview {
  id: number;
  description: string;
  user: User = new User();
  game: Game = new Game();
  isRecommended: boolean;
  comments: CommunityGameReviewComment[] = [];
  helpfulCount: number;
}
