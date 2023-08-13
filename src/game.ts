import { DeuceSubgame } from './deuceSubgame';
import { GameResult, Playable } from './types';

export class Game implements Playable {
  private player1: string;
  private player2: string;
  private player1Score: number;
  private player2Score: number;
  private deuceGame?: DeuceSubgame;
  readonly scoreMap: { [key: number]: string } = {
    0: '0',
    1: '15',
    2: '30',
    3: '40'
  };
  readonly scoreLabelMap: { [key: string]: number } = {
    '0': 0,
    '15': 1,
    '30': 2,
    '40': 3
  };

  constructor(player1: string, player2: string, score?: string) {
    this.player1 = player1;
    this.player2 = player2;
    if (score) {
      const scoreArray = score.split('-');
      if (scoreArray.length > 1) {
        this.player1Score = this.scoreLabelMap[scoreArray[0].trim()];
        this.player2Score = this.scoreLabelMap[scoreArray[1].trim()];
      } else {
        this.deuceGame = new DeuceSubgame(this.player1, this.player2, score);
        this.player1Score = 3;
        this.player2Score = 3;
      }
    } else {
      this.player1Score = 0;
      this.player2Score = 0;
    }
  }

  public score(): string {
    if (this.deuceGame !== undefined) {
      return this.deuceGame?.score();
    } else {
      return `${this.scoreMap[this.player1Score]}-${
        this.scoreMap[this.player2Score]
      }`;
    }
  }

  public pointWonBy(player: string): GameResult {
    if (this.deuceGame !== undefined) {
      const result = this.deuceGame?.pointWonBy(player);
      if (result.winner === undefined) {
        return {};
      } else return result;
    } else {
      if (player === this.player1) {
        this.player1Score += 1;
      } else if (player === this.player2) {
        this.player2Score += 1;
      }
      if (this.player1Score > 3) {
        return { winner: this.player1 };
      } else if (this.player2Score > 3) {
        return { winner: this.player2 };
      } else if (this.player1Score === 3 && this.player2Score === 3) {
        this.deuceGame = new DeuceSubgame(this.player1, this.player2);
        return {};
      } else return {};
    }
  }
}
