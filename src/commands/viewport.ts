import type { Compiler, State } from '../lib';

export function viewport($: Compiler, state: State, x: string = '0', y: string = '0') {
  state.viewport = { x, y };
  $.writeLine(`viewport ${x} ${y}`);
}
