import {User} from '../user';
import {CommunityGameReview} from './community-game-review';

export class CommunityGameReviewComment {
  id: number;
  user: User;
  review: CommunityGameReview;
  description: string;
}
