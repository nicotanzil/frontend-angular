import {InputGenre} from './input-genre';
import {InputTag} from './input-tag';
import {InputDeveloper} from './input-developer';
import {Publisher} from '../publisher';
import {System} from '../system';
import {InputGameImage} from './input-game-image';
import {InputPromo} from './input-promo';

export class InputGame {
  name: string;
  description: string;
  genres: InputGenre[] = [];
  tags: InputTag[] = [];
  originalPrice: number;
  promo: InputPromo = new InputPromo();
  developers: InputDeveloper[] = [];
  publisherId: number;
  systemId: number;
}
