import type { Macro, MacroWithYSLS } from '../types';
import type { YSLSCommand, YSLSData, YSLSFunction } from './types';
import { commands, functions } from './base';
import type { Y2DPartialConfig } from '../lib/Config';

function getConfigCommands(config: Record<string, Macro | MacroWithYSLS>): YSLSCommand[] {
  const ysls: YSLSCommand[] = [];
  for (const key in config) {
    const m = config[key];
    if ('ysls' in m) ysls.push(m.ysls);
  }
  return ysls;
}

export function getSignature(cmd: YSLSCommand | YSLSFunction) {
  return `${cmd.YarnName}(${cmd.Parameters.map(p => `${p.Name}: ${p.Type}`).join(', ')})`;
}

export function getYSLS(config: Y2DPartialConfig): YSLSData {
  const cmds = getConfigCommands(config.commands ?? {});
  const macros = getConfigCommands(config.macros ?? {});

  if (cmds.length) {
    console.group(`Registered ${cmds.length} command(s).`);
    for (const c of cmds) console.log(getSignature(c));
    console.groupEnd();
  }

  if (macros.length) {
    console.group(`Registered ${macros.length} macro(s).`);
    for (const m of macros) console.log(getSignature(m));
    console.groupEnd();
  }

  return {
    Commands: [...commands, ...cmds, ...macros],
    Functions: [...functions]
  };
}
