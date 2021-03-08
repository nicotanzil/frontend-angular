import {User} from '../user';
import {CommunityArtPostReview} from './community-art-post-review';

export class CommunityArtPost {
  id: number;
  description: string;
  link: string;
  isImage: boolean;
  userId: number;
  user: User = new User();
  like: number;
  reviews: CommunityArtPostReview[] = [];
}
