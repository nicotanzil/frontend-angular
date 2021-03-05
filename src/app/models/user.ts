import {SuspensionRequest} from './suspension-request';
import {Game} from './game';
import {Country} from './country';
import {Badge} from './badge';
import {AvatarFrame} from './user/avatar-frame';
import {ProfileBackground} from './user/profile-background';
import {MiniProfileBackground} from './user/mini-profile-background';
import {Theme} from './user/theme';

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
  avatarFrame: AvatarFrame = new AvatarFrame();
  profileBackground: ProfileBackground = new ProfileBackground();
  miniProfileBackground: MiniProfileBackground = new MiniProfileBackground();
  theme: Theme = new Theme();

  avatarFrames: AvatarFrame[] = [];
  profileBackgrounds: ProfileBackground[] = [];
  miniProfileBackgrounds: MiniProfileBackground[] = [];

  summary: string;
  country: Country = new Country();
  experience: number;
  isSuspend: boolean;

  games: Game[] = [];
  friends: User[] = [];

  featuredBadge: Badge = new Badge();
  badges: Badge[] = [];

}
