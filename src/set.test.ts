import { describe, it, expect } from 'vitest';
import { Set } from './set';

describe('Set', () => {
  it('is created with score of 0-0, 0-0', () => {
    const set = new Set('player1', 'player2');
    expect(set.score()).toEqual('0-0, 0-0');
  });

  it('when score is 0-0, 0-0 and player1 wins a point then score is 0-0, 15-0', () => {
    const set = new Set('player1', 'player2');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('0-0, 15-0');
  });

  it('when score is 0-0, 0-0 and player2 wins a point then score is 0-0, 0-15', () => {
    const set = new Set('player1', 'player2');
    set.pointWonBy('player2');
    expect(set.score()).toEqual('0-0, 0-15');
  });

  it('when score is 0-0, 0-0 and player2 wins a point then score is 0-0, 0-15', () => {
    const set = new Set('player1', 'player2');
    set.pointWonBy('player2');
    expect(set.score()).toEqual('0-0, 0-15');
  });

  it('when score is 0-0, 40-0 and player1 wins a point then score is 1-0, 0-0', () => {
    const set = new Set('player1', 'player2', '0-0, 40-0');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('1-0, 0-0');
  });

  it('when score is 0-0, 0-40 and player1 wins a point then score is 0-1, 0-0', () => {
    const set = new Set('player1', 'player2', '0-0, 0-40');
    set.pointWonBy('player2');
    expect(set.score()).toEqual('0-1, 0-0');
  });

  it('when score is 5-4, 40-0 and player1 wins a point then result is player1 win', () => {
    const set = new Set('player1', 'player2', '5-4, 40-0');
    expect(set.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when score is 5-5, 40-0 and player1 wins a point then score is 6-5, 0-0', () => {
    const set = new Set('player1', 'player2', '5-5, 40-0');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('6-5, 0-0');
  });

  it('when score is 6-5, 40-0 and player1 wins a point then result is player1 win', () => {
    const set = new Set('player1', 'player2', '6-5, 40-0');
    expect(set.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when score is 5-6, 40-0 and player1 wins a point then score is 6-6, 0-0', () => {
    const set = new Set('player1', 'player2', '5-6, 40-0');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('6-6, 0-0');
  });

  it('when score is 6-5, 0-40 and player2 wins a point then score is 6-6, 0-0', () => {
    const set = new Set('player1', 'player2', '6-5, 0-40');
    set.pointWonBy('player2');
    expect(set.score()).toEqual('6-6, 0-0');
  });

  it('when score is 5-6, 0-40 and player2 wins a point then result is player2 win', () => {
    const set = new Set('player1', 'player2', '5-6, 0-40');
    expect(set.pointWonBy('player2')).toMatchObject({ winner: 'player2' });
  });

  it('when score is 6-6, 0-0 and player1 wins a point then score is 6-6, 1-0', () => {
    const set = new Set('player1', 'player2', '6-6, 0-0');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('6-6, 1-0');
  });

  it('when score is 6-6, 0-0 and player2 wins a point then score is 6-6, 0-1', () => {
    const set = new Set('player1', 'player2', '6-6, 0-0');
    set.pointWonBy('player2');
    expect(set.score()).toEqual('6-6, 0-1');
  });

  it('when score is 6-6, 6-0 and player1 wins a point then result is player1 win', () => {
    const set = new Set('player1', 'player2', '6-6, 6-0');
    expect(set.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when score is 6-6, 7-7 and player1 wins a point then score is 6-6, 8-7', () => {
    const set = new Set('player1', 'player2', '6-6, 7-7');
    expect(set.pointWonBy('player1').winner).toBeUndefined();
  });

  it('when score is 6-6, 7-7 and player1 wins a point then score is 6-6, 8-7', () => {
    const set = new Set('player1', 'player2', '6-6, 7-7');
    set.pointWonBy('player1');
    expect(set.score()).toEqual('6-6, 8-7');
  });

  it('when score is 6-6, 8-7 and player1 wins a point then result is player1 win', () => {
    const set = new Set('player1', 'player2', '6-6, 8-7');
    expect(set.pointWonBy('player1')).toMatchObject({ winner: 'player1' });
  });

  it('when created with score of 0-0, 0-0 and unknown player is provided, the score doesn;t change', () => {
    const set = new Set('player1', 'player2');
    set.pointWonBy('player3');
    expect(set.score()).toEqual('0-0, 0-0');
  });
});
