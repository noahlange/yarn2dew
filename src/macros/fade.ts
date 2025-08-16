import type { Compiler, State } from '../lib';

export function beginFade($: Compiler, state: State, time: string, toContinue: string) {
  state.beginFade = { time, toContinue: toContinue };
  $.writeLine(`globalFade ${time} ${toContinue != 'false'}`);
  $.writeLine('viewport -100 -100');
}

export function endFade($: Compiler, state: State) {
  if (typeof state.beginFade != 'object') {
    throw new Error('must begin fade before ending');
  } else {
    const { toContinue, time } = state.beginFade;
    if (typeof state.viewport === 'object') {
      $.writeLine(`viewport ${state.viewport.x} ${state.viewport.y}`);
      $.writeLine(`globalFadeToClear ${time} ${toContinue != 'false'}`);
    }
  }
}
