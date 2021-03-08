import {CommunityArtPost} from './community-art-post';
import {User} from '../user';

export class CommunityArtPostReview {
  id: number;
  postId: number;
  post: CommunityArtPost = new CommunityArtPost();
  userId: number;
  user: User = new User();
  comment: string;
}
