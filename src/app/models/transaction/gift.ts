import {User} from '../user';

export class Gift {
  id: number;
  sender: User;
  receiver: User;
  firstName: string;
  message: string;
  sentiment: string;
  signature: string;
  isComplete: boolean;
  isOpen: boolean;
}
