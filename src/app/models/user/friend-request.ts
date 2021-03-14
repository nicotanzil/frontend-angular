import {User} from '../user';

export class FriendRequest {
  id: number;
  requester: User = new User();
  requested: User = new User();
  status: string;
}
