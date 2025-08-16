import { describe, test, expect } from 'bun:test';
import { generate } from '../generate';

const header = `
title: Adventure
target: Data/Events/Trailer
`;

const message = `
Marlon: You're obligated to go on an adventure this {"{{Season}}"}!
Whaddya say?
  -> Neat-o!
  -> I haven't—do you have any tips or tricks?
  -> I don't want to go on an adventure!
`;

const speak = `
Marlon: You're obligated to go on an adventure this {"{{Season}}"}!
Marlon: Whaddya say?
  -> Neat-o!
  -> I haven't—do you have any tips or tricks?
  -> I don't want to go on an adventure!
`;

describe('QuestionNode', () => {
  test("messages before questions don't cause explosions", () => {
    expect(() => generate(`${header}---${message}===`)).not.toThrow();
  });

  test("speak before questions don't cause explosions", () => {
    expect(() => generate(`${header}---${speak}===`)).not.toThrow();
  });
});
