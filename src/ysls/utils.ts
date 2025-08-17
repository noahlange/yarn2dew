import type { Macro } from '../types';
import type { YSLSCommand, YSLSData, YSLSFunction } from './types';
import macros from '../macros';
import commands from '../commands';
import * as base from './base';
import type { Y2DConfig } from '../lib/Config';

function getConfigCommands(config: Record<string, Macro>, isMacro: boolean): YSLSCommand[] {
  const ysls: YSLSCommand[] = [];
  for (const key in config) {
    const m = config[key];
    if (m.ysls) ysls.push({ ...m.ysls, YarnName: isMacro ? `$${key}` : key });
  }
  return ysls;
}

export function getSignature(cmd: YSLSCommand | YSLSFunction) {
  return `${cmd.YarnName}(${cmd.Parameters.map(p => `${p.Name}: ${p.Type}`).join(', ')})`;
}

const builtIns = { macros, commands };

export function getYSLS(config: Y2DConfig): YSLSData {
  const all: YSLSCommand[] = [];
  for (const key of ['commands', 'macros'] as const) {
    const cfg = Object.assign({}, config[key], builtIns[key]);
    const cmds = getConfigCommands(cfg, key === 'macros');
    console.group(`\nRegistered ${cmds.length} ${key}.`);
    for (const c of cmds) console.log(getSignature(c));
    all.push(...cmds);
    console.groupEnd();
  }

  return {
    Commands: [...base.commands, ...all],
    Functions: [...base.functions]
  };
}
