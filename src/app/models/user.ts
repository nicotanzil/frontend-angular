import {SuspensionRequest} from './suspension-request';

export class User {
  id: string;
  accountName: string;
  profileName: string;
  realName: string;
  email: string;
  password: string;
  balance: number;
  customUrl: string;
  avatar: string;
  avatarFrame: string;
  profileBackground: string;
  miniProfileBackground: string;
  theme: string;
  summary: string;
  country: string;
  experience: number;
  isSuspend: boolean;
  suspensionRequest: SuspensionRequest;
  level: number;
}
