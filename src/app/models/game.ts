import {Time} from '@angular/common';
import {Genre} from './genre';
import {Tag} from './tag';
import {Review} from './review';
import {Developer} from './developer';
import {Publisher} from './publisher';
import {System} from './system';
import {GameImage} from './game-image';
import {GameVideo} from './game-video';
import {Promo} from './promo';
import {GameDiscussion} from './community/game-discussion';

export class Game {
  id: number;
  name: string;
  description: string;
  genres: Genre[] = [];
  tags: Tag[] = [];
  originalPrice: number;
  promo: Promo = new Promo();
  gamePlayHour: number;
  gameReviews: Review[] = [];
  developers: Developer[] = [];
  publisher: Publisher = new Publisher();
  system: System = new System();

  banner: string;
  video: GameVideo[] = [];
  images: GameImage[] = [];

  discussions: GameDiscussion[] = [];

  createdAt: Date;
}
