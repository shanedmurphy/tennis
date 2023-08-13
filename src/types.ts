export interface Playable {
  pointWonBy(player: string): PointResult;
  score(): string;
}

export type PointResult = {
  winner?: string;
};
