export interface Playable {
  pointWonBy(player: string): GameResult;
  score(): string;
}

export type GameResult = {
  winner?: string;
};
