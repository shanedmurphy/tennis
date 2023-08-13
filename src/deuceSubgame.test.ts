import { describe, it, expect } from 'vitest';
import { DeuceSubgame } from './deuceSubgame';

describe('Deuce Subgame', () => {
  it('is created with correct score', () => {
    const game = new DeuceSubgame('player1', 'player2');
    expect(game.score()).toEqual('Deuce');
  });

  it('when score is deuce and player1 wins a point then score is Advantge player1', () => {
    const game = new DeuceSubgame('player1', 'player2');
    game.pointWonBy('player1');
    expect(game.score()).toEqual('Advantage player1');
  });

  it('when score is deuce and player2 wins a point then score is Advantge player2', () => {
    const game = new DeuceSubgame('player1', 'player2');
    game.pointWonBy('player2');
    expect(game.score()).toEqual('Advantage player2');
  });

  it('when score is Advantage player1 and player2 wins a point then score is Deuce', () => {
    const game = new DeuceSubgame('player1', 'player2', 'Advantage player1');
    game.pointWonBy('player2');
    expect(game.score()).toEqual('Deuce');
  });

  it('when score is Advantage player1 and player2 wins a point then result is undefined', () => {
    const game = new DeuceSubgame('player1', 'player2', 'Advantage player1');
    expect(game.pointWonBy('player2').winner).toBeUndefined();
  });

  it('when score is Advantage player2 and player1 wins a point then result is undefined', () => {
    const game = new DeuceSubgame('player1', 'player2', 'Advantage player2');
    expect(game.pointWonBy('player1').winner).toBeUndefined();
  });

  it('when score is Advantage player1 and player1 wins a point then result is player1 win', () => {
    const game = new DeuceSubgame('player1', 'player2', 'Advantage player1');
    expect(game.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when score is Advantage player2 and player2 wins a point then result is player2 win', () => {
    const game = new DeuceSubgame('player1', 'player2', 'Advantage player2');
    expect(game.pointWonBy('player2')).toMatchObject({ winner: 'player2' });
  });
});
