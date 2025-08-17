import type { Compiler, State } from '../lib';

export function wait($: Compiler, state: State, sec: string) {
  const num = +sec;
  const ms = isNaN(num) ? '1000' : (num * 1000).toString();
  $.writeLine(`pause ${ms}`);
}
