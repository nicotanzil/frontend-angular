import {InputGenre} from './input-genre';
import {InputTag} from './input-tag';
import {InputDeveloper} from './input-developer';
import {Publisher} from '../publisher';
import {System} from '../system';

export class InputGame {
  name: string;
  description: string;
  genres: InputGenre[] = [];
  tags: InputTag[] = [];
  originalPrice: number;
  onSale: boolean;
  discountPercentage = 0;
  developers: InputDeveloper[] = [];
  publisher: number;
  system: number;

  banner: string;
  video: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}
