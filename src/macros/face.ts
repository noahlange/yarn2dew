import type { Compiler, State } from '../lib';

function fn(
  $: Compiler,
  state: State,
  npc1: string,
  npc2: string,
  toContinue: string | null = null
) {
  const [a, b] = [state.position[npc1], state.position[npc2]];
  const deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 180;
  const direction = Math.floor((deg + 45) / 90) % 4;
  state.position[npc1].d = direction;
  $.writeLine(
    toContinue == null
      ? `faceDirection ${npc1} ${direction}`
      : `faceDirection ${npc1} ${direction} ${toContinue}`
  );
}

const ysls = {
  Documentation: 'Make one NPC change direction to face another NPC.',
  Parameters: [
    { Name: 'npc1', Type: 'string' },
    { Name: 'npc2', Type: 'string' },
    { Name: 'continue', Type: 'boolean', DefaultValue: false }
  ]
};

export default Object.assign(fn, { ysls });
