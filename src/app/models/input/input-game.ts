import {InputGenre} from './input-genre';
import {InputTag} from './input-tag';
import {InputDeveloper} from './input-developer';

export class InputGame {
  name: string;
  description: string;
  genres: InputGenre[] = [];
  tags: InputTag[] = [];
  originalPrice: number;
  developers: InputDeveloper[] = [];
  publisherId: number;
  systemId: number;
}
