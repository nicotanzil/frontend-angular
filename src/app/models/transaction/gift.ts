import {User} from '../user';

export class Gift {
  id: number;
  sender: User = new User();
  receiver: User = new User();
  firstName: string;
  message: string;
  sentiment: string;
  signature: string;
  isComplete: boolean;
  isOpen: boolean;
}
