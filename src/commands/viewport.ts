import type { Compiler, State } from '../lib';

function viewport($: Compiler, state: State, x: string = '0', y: string = '0') {
  state.viewport = { x, y };
  $.writeLine(`viewport ${x} ${y}`);
}

Object.assign(viewport, {
  ysls: {
    YarnName: 'viewport',
    Documentation: 'Instantly reposition the camera to center on the given x, y tile position.',
    Parameters: [
      { Name: 'x', Type: 'number' },
      { Name: 'y', Type: 'number' }
    ]
  }
});

export { viewport };
