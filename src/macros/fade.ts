import type { Compiler, State } from '../lib';

const parse = (state: State, time: string, toContinue: string) => {
  return {
    x: state.viewport.x,
    y: state.viewport.y,
    time: parseFloat(time),
    toContinue: toContinue == 'true'
  };
};

export const beginFade = Object.assign(
  ($: Compiler, state: State, time: string = '0.007', toContinue: string = 'false') => {
    const args = parse(state, time, toContinue);
    $.writeLine(`globalFade ${args.time} ${args.toContinue}`);
    $.writeLine('viewport -100 -100');
  },
  {
    getInitialState: (state: State) => ({
      ...state,
      viewport: state.viewport ?? { x: 0, y: 0 },
      beginFade: { time: 0, toContinue: false }
    }),
    ysls: {
      YarnName: '$beginFade',
      Documentation: 'Start a global fade to black and move the camera off-screen.',
      Parameters: [
        { Name: 'time', Type: 'number', DefaultValue: '0.007' },
        { Name: 'continue', Type: 'boolean', DefaultValue: 'false' }
      ]
    }
  }
);

export const endFade = Object.assign(
  ($: Compiler, state: State) => {
    // reset viewport to its initial value
    const { x, y } = state.viewport;
    $.writeLine(`viewport ${x} ${y}`);
    // normal fade-in behavior
    const { time, toContinue } = state.beginFade;
    $.writeLine(`globalFadeToClear ${time} ${toContinue}`);
  },
  {
    ysls: {
      YarnName: '$endFade',
      Documentation:
        'Global fade to clear with previous parameters, returning camera to its original position.',
      Parameters: []
    }
  }
);
