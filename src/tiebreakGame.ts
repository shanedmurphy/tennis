import { PointResult, Playable } from './types';

export class TiebreakGame implements Playable {
  private player1: string;
  private player2: string;
  private player1Score: number;
  private player2Score: number;

  constructor(player1: string, player2: string, score?: string) {
    this.player1 = player1;
    this.player2 = player2;
    if (score) {
      this.player1Score = parseInt(score.split('-')[0]);
      this.player2Score = parseInt(score.split('-')[1]);
    } else {
      this.player1Score = 0;
      this.player2Score = 0;
    }
  }

  public score(): string {
    return `${this.player1Score}-${this.player2Score}`;
  }

  public pointWonBy(player: string): PointResult {
    if (player === this.player1) {
      this.player1Score += 1;
      if (
        this.player1Score >= 7 &&
        this.player1Score - this.player2Score >= 2
      ) {
        return { winner: this.player1 };
      } else {
        return {};
      }
    } else if (player === this.player2) {
      this.player2Score += 1;
      if (
        this.player2Score >= 7 &&
        this.player2Score - this.player1Score >= 2
      ) {
        return { winner: this.player2 };
      } else {
        return {};
      }
    } else return {};
  }
}
