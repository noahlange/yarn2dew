import type { Compiler, State } from '../lib';

function parse(x: string, y: string, d: string) {
  const res = { x: +x, y: +y, d: +d };
  if (isFinite(res.x) && isFinite(res.y) && isFinite(res.d)) {
    if (res.d < 0 || res.d > 4) {
      throw new Error(`[ValidationError] StartNode direction is not between 0–3 (inclusive).`);
    }
    return res;
  } else {
    throw new Error(`[ValidationError] StartNode args are incorrect`);
  }
}

function fn($: Compiler, state: State, name: string, x: string, y: string, d: string) {
  const args = parse(x, y, d);
  const pos = Object.assign((state.position[name] ??= args), args);
  $.declare(`start ${name}`, `${name} ${pos.x} ${pos.y} ${pos.d}`);
}

const ysls = {
  Documentation: 'Sets the start position and direction for a character.',
  Parameters: [
    { Name: 'Character', Type: 'string' },
    { Name: 'x', Type: 'number' },
    { Name: 'y', Type: 'number' },
    { Name: 'direction', Type: 'number' }
  ]
};

function getInitialState(state: State) {
  return { ...state, position: {} };
}

export default Object.assign(fn, { getInitialState, ysls });
