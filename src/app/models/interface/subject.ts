import {GameObserver} from './game-observer';

export interface Subject {
  registerObserver(o: GameObserver): void;

  removeObserver(o: GameObserver): void;

  notifyObserver(): void;
}
