import { describe, it, expect } from 'vitest';
import { Game } from './game';

describe('Game', () => {
  it('is created with score of 0-0', () => {
    const game = new Game('player1', 'player2');
    expect(game.score()).toEqual('0-0');
  });

  it('when score is 0-0 and player1 wins a point then score is 15-0', () => {
    const game = new Game('player1', 'player2');
    game.pointWonBy('player1');
    expect(game.score()).toEqual('15-0');
  });

  it('when score is 0-0 and player2 wins a point then score is 0-15', () => {
    const game = new Game('player1', 'player2');
    game.pointWonBy('player2');
    expect(game.score()).toEqual('0-15');
  });

  it('when score is 15-0 and player1 wins a point then score is 30-0', () => {
    const game = new Game('player1', 'player2', '15-0');
    game.pointWonBy('player1');
    expect(game.score()).toEqual('30-0');
  });

  it('when score is 15-0 and player2 wins a point then score is 15-15', () => {
    const game = new Game('player1', 'player2', '15-0');
    game.pointWonBy('player2');
    expect(game.score()).toEqual('15-15');
  });

  it('when score is 40-0 and player1 wins a point then result is player1 win', () => {
    const game = new Game('player1', 'player2', '40-0');
    expect(game.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when score is 30-40 and player1 wins a point then score is Deuce', () => {
    const game = new Game('player1', 'player2', '30-40');
    game.pointWonBy('player1');
    expect(game.score()).toEqual('Deuce');
  });

  it('when score is Deuce and player1 wins a point then score is Advantage player1', () => {
    const game = new Game('player1', 'player2', 'Deuce');
    game.pointWonBy('player1');
    expect(game.score()).toEqual('Advantage player1');
  });

  it('when score is Advantage player1 and player2 wins a point then score is Deuce', () => {
    const game = new Game('player1', 'player2', 'Advantage player1');
    game.pointWonBy('player2');
    expect(game.score()).toEqual('Deuce');
  });

  it('when score is Advantage player1 and player1 wins a point then result is player1 win', () => {
    const game = new Game('player1', 'player2', 'Advantage player1');
    expect(game.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });
});
