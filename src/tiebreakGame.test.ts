import { describe, it, expect } from 'vitest';
import { TiebreakGame } from './tiebreakGame';

describe('TiebreakGame', () => {
  it('is created with score of 0-0', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2');
    expect(tiebreakGame.score()).toEqual('0-0');
  });

  it('when score is 0-0 and player1 wins a point then score is 1-0', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2');
    tiebreakGame.pointWonBy('player1');
    expect(tiebreakGame.score()).toEqual('1-0');
  });

  it('when score is 0-0 and player2 wins a point then score is 0-1', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2');
    tiebreakGame.pointWonBy('player2');
    expect(tiebreakGame.score()).toEqual('0-1');
  });

  it('when score is 7-0 and player1 wins a point then result is player1 win', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2', '7-0');
    expect(tiebreakGame.pointWonBy('player1')).toMatchObject({
      winner: 'player1'
    });
  });

  it('when score is 7-7 and player1 wins a point then score is 8-7', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2', '7-7');
    tiebreakGame.pointWonBy('player1');
    expect(tiebreakGame.score()).toEqual('8-7');
  });

  it('when score is 8-7 and player1 wins a point then result is player1 win', () => {
    const tiebreakGame = new TiebreakGame('player1', 'player2', '8-7');
    expect(tiebreakGame.pointWonBy('player1')).toMatchObject({
      winner: 'player1'
    });
  });
});
