import {User} from '../user';

export class UpdateUser {

  accountName: string;
  profileName: string;
  realName: string;
  customURL: string;
  summary: string;
  avatar: string;
  avatarFrameId: number;
  profileBackgroundId: number;
  miniProfileBackgroundId: number;
  themeId: number;
  featuredBadgeId: number;
  CountryId: number;

  public constructor(user: User) {
    this.accountName = user.accountName;
    this.profileName = user.profileName;
    this.realName = user.realName;
    this.customURL = user.customURL;
    this.summary = user.summary;
    this.avatar = user.avatar;
    this.avatarFrameId = user.avatarFrame.id;
    this.profileBackgroundId = user.profileBackground.id;
    this.miniProfileBackgroundId = user.miniProfileBackground.id;
    this.themeId = user.theme.id;
    this.featuredBadgeId = user.featuredBadge.id;
    this.CountryId = user.country.id;
  }
}
