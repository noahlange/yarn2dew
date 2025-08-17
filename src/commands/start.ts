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

export const start = Object.assign(
  ($: Compiler, state: State, name: string, x: string, y: string, d: string) => {
    const args = parse(x, y, d);
    const buffer = $.getBuffer();
    const prev = buffer[0] ?? '';
    const pos = (state.position[name] ??= args);
    Object.assign(pos, args);
    buffer[0] = prev + `${name} ${args.x} ${args.y} ${args.d} `;
  },
  {
    getInitialState: (state: State) => ({ ...state, position: {} }),
    ysls: {
      YarnName: 'start',
      Language: 'text',
      Documentation: 'Sets the start position and direction for a character.',
      Parameters: [
        { Name: 'Character', Type: 'string' },
        { Name: 'x', Type: 'number' },
        { Name: 'y', Type: 'number' },
        { Name: 'direction', Type: 'number' }
      ]
    }
  }
);
