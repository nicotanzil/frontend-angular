import {Time} from '@angular/common';
import {Genre} from './genre';
import {Tag} from './tag';
import {Review} from './review';
import {Developer} from './developer';
import {Publisher} from './publisher';
import {System} from './system';
import {GameImage} from './game-image';
import {GameVideo} from './game-video';

export class Game {
  id: number;
  name: string;
  description: string;
  genres: Genre[] = [];
  tags: Tag[] = [];
  originalPrice: number;
  onSale: boolean;
  discountPercentage: number;
  gamePlayHour: number;
  gameReviews: Review[] = [];
  developers: Developer[] = [];
  publisher: Publisher;
  system: System;

  banner: string;
  video: GameVideo[] = [];
  images: GameImage[] = [];

  createdAt: Date;
}
