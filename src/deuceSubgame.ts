import { GameResult, Playable } from './types';

export class DeuceSubgame implements Playable {
  private player1: string;
  private player2: string;
  private player1Score: number;
  private player2Score: number;
  private scoreMap: { [key: string]: string };
  private scoreLabelMap: { [key: string]: string };

  constructor(player1: string, player2: string, score?: string) {
    this.player1 = player1;
    this.player2 = player2;
    this.scoreMap = {
      '0, 0': 'Deuce',
      '1, 0': `Advantage ${this.player1}`,
      '0, 1': `Advantage ${this.player2}`
    };
    this.scoreLabelMap = {
      Deuce: '0, 0',
      [`Advantage ${this.player1}`]: '1, 0',
      [`Advantage ${this.player2}`]: '0, 1'
    };
    if (score) {
      this.player1Score = parseInt(
        this.scoreLabelMap[score].split(',')[0].trim()
      );
      this.player2Score = parseInt(
        this.scoreLabelMap[score].split(',')[1].trim()
      );
    } else {
      this.player1Score = 0;
      this.player2Score = 0;
    }
  }

  public score(): string {
    return this.scoreMap[`${this.player1Score}, ${this.player2Score}`];
  }

  public pointWonBy(player: string): GameResult {
    if (player === this.player1) {
      switch (this.score()) {
        case 'Deuce':
          this.player1Score += 1;
          return {};
        case `Advantage ${this.player1}`:
          return {
            winner: this.player1
          };
        case `Advantage ${this.player2}`:
          this.player2Score -= 1;
          return {};
        default:
          return {};
      }
    } else if (player === this.player2) {
      switch (this.score()) {
        case 'Deuce':
          this.player2Score += 1;
          return {};
        case `Advantage ${this.player1}`:
          this.player1Score -= 1;
          return {};
        case `Advantage ${this.player2}`:
          return {
            winner: this.player2
          };
        default:
          return {};
      }
    } else {
      return {};
    }
  }
}
