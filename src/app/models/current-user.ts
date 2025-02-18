import {SuspensionRequest} from './suspension-request';

export class CurrentUser {
  public static id: string;
  public static accountName: string;
  public static profileName: string;
  public static realName: string;
  public static email: string;
  public static password: string;
  public static balance: number;
  public static customUrl: string;
  public static avatar: string;
  public static avatarFrame: string;
  public static profileBackground: string;
  public static miniProfileBackground: string;
  public static theme: string;
  public static summary: string;
  public static country: string;
  public static experience: number;
  public static isSuspend: boolean;
  public static suspensionRequest: SuspensionRequest;
  public static level: number;
}
