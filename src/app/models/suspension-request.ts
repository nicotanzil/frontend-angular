import {User} from './user';

export class SuspensionRequest {
  id: number;
  description: string;
  user: User;
  createdAt: Date;
}
