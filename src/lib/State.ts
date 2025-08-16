import { match } from 'ts-pattern';

type StateType = 'string' | 'number' | 'boolean';

export class State {
  private store: Record<string, Record<string, string>> = {};

  public get(name: string, key: string, asType: 'number'): number;
  public get(name: string, key: string, asType: 'string'): string;
  public get(name: string, key: string, asType: 'boolean'): boolean;
  public get(name: string, key: string, asType: StateType) {
    const args = [name, key, asType].filter(Boolean);

    switch (args.length) {
      case 1: {
        return this.getVal('default', args[0]!, 'string');
      }
      case 2: {
        if (key === 'string' || key === 'number' || key === 'boolean') {
          return this.getVal('default', args[0], key);
        } else {
          return this.getVal(name, args[0], 'string');
        }
      }
      case 3: {
        this.getVal(args[0]!, args[1]!, args[2]! as StateType);
      }
    }
    return this.getVal(name, key, asType);
  }

  public set(key: string, value: string): void;
  public set(key: string, value: string): void;
  public set(name: string, key: string, value: string): void;
  public set(name: string, key: string, value: string): void;
  public set(name: string, key: string, value?: string): void {
    const args = [name, key, value].filter(Boolean);
    switch (args.length) {
      case 3: {
        this.setVal(args[0]!, args[1]!, args[2]!);
      }
      case 2: {
        this.setVal('default', args[0]!, args[1]!);
      }
    }
  }

  private getVal(name: string, key: string, type: StateType): string | number | boolean {
    if (name in this.store) {
      const value = this.store[name][key];
      const res = match({ type, value })
        .with({ type: 'string' }, ({ value }) => value.toString())
        .with({ type: 'number' }, ({ value }) => +value)
        .with({ type: 'boolean' }, ({ value }) => value == 'true');
      return res as unknown as string | number | boolean;
    } else {
      throw new Error(`no ${name} in state`);
    }
  }

  private setVal(name: string, key: string, value: string) {
    if (!(name in this.store)) this.store[name] = {};
    this.store[name][key] = value;
  }
}
