import {User} from './user';

export class UserReport {
  id: number;
  reporter: User;
  reported: User;
  description: string;
  createdAt: Date;
}
