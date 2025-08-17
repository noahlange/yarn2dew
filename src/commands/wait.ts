import type { Compiler, State } from '../lib';

function fn($: Compiler, state: State, sec: string) {
  const num = +sec;
  const ms = isNaN(num) ? '1000' : (num * 1000).toString();
  $.writeLine(`pause ${ms}`);
}

const ysls = {
  YarnName: 'wait',
  Documentation: 'Pause for <count> seconds.',
  Parameters: [{ Name: 'count', Type: 'number' }]
};

export default Object.assign(fn, {
  ysls
});
