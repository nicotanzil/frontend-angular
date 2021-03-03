import {SuspensionRequest} from './suspension-request';
import {Game} from './game';
import {Country} from './country';
import {Badge} from './badge';

export class User {
  id: number;
  accountName: string;
  profileName: string;
  realName: string;
  email: string;
  password: string;
  balance: number;
  customURL: string;
  avatar: string;
  avatarFrame: string;
  profileBackground: string;
  miniProfileBackground: string;
  theme: string;
  summary: string;
  country: Country = new Country();
  experience: number;
  isSuspend: boolean;

  games: Game[] = [];
  friends: User[] = [];

  featuredBadge: Badge = new Badge();
  badges: Badge[] = [];

}
