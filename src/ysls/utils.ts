import type { Command } from '../types';
import type { YSLSCommand, YSLSData, YSLSFunction } from './types';
import commands from '../commands';
import * as base from './base';
import type { Y2DConfig } from '../lib/Config';

function getConfigCommands(config: Record<string, Command>): YSLSCommand[] {
  const ysls: YSLSCommand[] = [];
  for (const YarnName in config) {
    const m = config[YarnName];
    if (m.ysls) ysls.push({ ...m.ysls, YarnName });
  }
  return ysls;
}

export function getSignature(cmd: YSLSCommand | YSLSFunction) {
  return `${cmd.YarnName}(${cmd.Parameters.map(p => `${p.Name}: ${p.Type}`).join(', ')})`;
}

export function getYSLS(config: Y2DConfig): YSLSData {
  const all: YSLSCommand[] = [];

  const cfg = Object.assign({}, commands, config.commands);
  const cmds = getConfigCommands(cfg);
  console.group(`\nRegistered ${cmds.length} commands.`);
  for (const c of cmds) console.log(getSignature(c));
  all.push(...cmds);
  console.groupEnd();

  return {
    Commands: [...base.commands, ...all],
    Functions: [...base.functions]
  };
}
