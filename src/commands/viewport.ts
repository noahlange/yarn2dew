import type { Compiler, State } from '../lib';

export function viewport($: Compiler, state: State, x: string, y: string) {
  state.viewport = { x, y };
  $.writeLine(`viewport ${x} ${y}`);
}
