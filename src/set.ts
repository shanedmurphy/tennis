import { Game } from './game';
import { TiebreakGame } from './tiebreakGame';
import { PointResult, Playable } from './types';

export class Set implements Playable {
  private player1: string;
  private player2: string;
  private player1Score: number;
  private player2Score: number;
  private game: Game | TiebreakGame;

  constructor(player1: string, player2: string, score?: string) {
    this.player1 = player1;
    this.player2 = player2;
    if (score) {
      const setScore = score.split(',')[0].trim();
      const gameScore = score.split(',')[1].trim();
      this.player1Score = parseInt(setScore.split('-')[0].trim());
      this.player2Score = parseInt(setScore.split('-')[1].trim());
      if (this.player1Score >= 6 || this.player2Score >= 6) {
        this.game = new TiebreakGame(this.player1, this.player2, gameScore);
      } else {
        this.game = new Game(this.player1, this.player2, gameScore);
      }
    } else {
      this.player1Score = 0;
      this.player2Score = 0;
      this.game = new Game(this.player1, this.player2);
    }
  }

  public score(): string {
    return `${this.player1Score}-${this.player2Score}, ${this.game.score()}`;
  }

  public pointWonBy(player: string): PointResult {
    const gameResult = this.game.pointWonBy(player);
    if (gameResult.winner === undefined) {
      return {};
    } else {
      if (gameResult.winner === this.player1) {
        this.player1Score += 1;
        if (
          this.player1Score === 7 ||
          (this.player1Score === 6 && this.player2Score <= 4)
        ) {
          return { winner: this.player1 };
        } else if (this.player1Score === 6 && this.player2Score === 6) {
          this.game = new TiebreakGame(this.player1, this.player2);
          return {};
        } else {
          this.game = new Game(this.player1, this.player2);
          return {};
        }
      } else if (gameResult.winner === this.player2) {
        this.player2Score += 1;
        if (
          this.player2Score === 7 ||
          (this.player2Score === 6 && this.player1Score <= 4)
        ) {
          return { winner: this.player2 };
        } else if (this.player2Score === 6 && this.player1Score === 6) {
          this.game = new TiebreakGame(this.player1, this.player2);
          return {};
        } else {
          this.game = new Game(this.player1, this.player2);
          return {};
        }
      } else {
        return {};
      }
    }
  }
}
