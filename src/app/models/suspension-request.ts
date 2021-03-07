import {InputUser} from './input/input-user';

export class SuspensionRequest {
  id: number;
  description: string;
  user: InputUser = new InputUser();
  createdAt: Date;
}
