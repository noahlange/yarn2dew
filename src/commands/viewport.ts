import type { Compiler, State } from '../lib';

const parse = (x: string, y: string) => {
  const res = { x: +x, y: +y };
  if (isFinite(res.x) && isFinite(res.y)) {
    return res;
  }
  throw new Error(`failed to parse viewport command args ${x}, ${y}`);
};

function viewport($: Compiler, state: State, x: string = '0', y: string = '0') {
  state.viewport = parse(x, y);
  $.writeLine(`viewport ${state.viewport.x} ${state.viewport.y}`);
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
