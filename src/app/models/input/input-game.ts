import {InputGenre} from './input-genre';
import {InputTag} from './input-tag';
import {InputDeveloper} from './input-developer';
import {Publisher} from '../publisher';
import {System} from '../system';
import {InputGameImage} from './input-game-image';

export class InputGame {
  name: string;
  description: string;
  genres: InputGenre[] = [];
  tags: InputTag[] = [];
  originalPrice: number;
  onSale = false;
  discountPercentage = 0;
  developers: InputDeveloper[] = [];
  publisher: number;
  system: number;
}
