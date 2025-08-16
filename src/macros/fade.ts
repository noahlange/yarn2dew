import type { Compiler, State } from '../lib';

export function beginFade($: Compiler, state: State, time: string = '0.007', toContinue: string = 'false') {
  state.beginFade = { time, toContinue };
  $.writeLine(`globalFade ${time} ${toContinue != 'false'}`);
  // if viewport's been set, assume we want the screen to go dark
  if ('viewport' in state) $.writeLine('viewport -100 -100');
}

export function endFade($: Compiler, state: State) {
  // reset viewport to its initial value
  const { x = null, y = null } = state.viewport ?? { x: null, y: null };
  if (x !== null && y != null) $.writeLine(`viewport ${x} ${y}`);
  // normal fade-in behavior
  const { time = 0.007, toContinue = 'true' } = state.beginFade;
  $.writeLine(`globalFadeToClear ${time} ${toContinue != 'false'}`);
}
