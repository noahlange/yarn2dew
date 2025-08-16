import { join } from 'node:path';
import type { Macro, MacroWithYSLS } from '../types';
import macros from '../macros';
import commands from '../commands';
import { getYSLS } from '../ysls/utils';
import type { YSLSData } from '../ysls/types';

export interface Y2DPartialConfig {
  namespace: string;
  directory?: string;
  macros?: Record<string, Macro | MacroWithYSLS>;
  commands?: Record<string, Macro | MacroWithYSLS>;
}

export interface Y2DConfig {
  namespace: string;
  directory: string;
  macros: Record<string, Macro>;
  commands: Record<string, Macro>;
}

export class Config {
  private static getFns(config: Record<string, Macro | MacroWithYSLS> = {}): Record<string, Macro> {
    const fns: Record<string, Macro> = {};
    for (const key in config) {
      const m = config[key];
      fns[key] = typeof m === 'function' ? m : m.default;
    }
    return fns;
  }

  /**
   * Returns a basic test config.
   */
  public static get test() {
    return new Config({ directory: process.cwd(), namespace: 'Y2D', macros, commands });
  }

  public static async load(directory: string = process.cwd()): Promise<Config> {
    console.log('Loading project configuration...');
    const filenames = [`y2d.config.ts`, `y2d.config.js`];

    for (const name of filenames) {
      try {
        const mod = await import(join(directory, name));
        if (!mod.default) throw new Error('...config has no default export.');
        return new Config(
          {
            directory,
            ...mod.default,
            macros: { ...macros, ...this.getFns(mod.default.macros) },
            commands: { ...commands, ...this.getFns(mod.default.commands) }
          },
          getYSLS(mod.default)
        );
      } catch {
        // no-op
      }
    }
    throw new Error('...no config file found.');
  }

  public async writeYSLS() {
    const json = JSON.stringify(this.ysls);
    await Bun.write(join(this.data.directory, 'StardewValley.ysls.json'), json, {
      createPath: true
    });
  }

  public get namespace() {
    return this.data.namespace;
  }

  public get directory() {
    return this.data.directory ?? process.cwd();
  }

  public get macros() {
    return this.data.macros;
  }

  public get commands() {
    return this.data.commands;
  }

  public constructor(
    private data: Y2DConfig,
    private ysls: YSLSData = { Commands: [], Functions: [] }
  ) {}
}
