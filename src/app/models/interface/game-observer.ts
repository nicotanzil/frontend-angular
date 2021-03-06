export interface GameObserver {
  sendEmail(email: string, gameId: number): void;
}
