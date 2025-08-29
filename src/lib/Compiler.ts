import { match } from 'ts-pattern';
import { DocumentNode } from '../nodes';
import { Builder } from './Builder';

import type { Config } from './Config';
import type { State } from '../types';

export enum ScopeType {
  NONE,
  EVENT
}

export interface Declaration {
  key: string;
  value: string;
}

export interface Scope {
  id: number;
  type: ScopeType;
  decls: Declaration[];
  name: string | null;
  content: string[];
  count: number;
}

export class Compiler {
  public static compile(config: Config, node: DocumentNode) {
    const compiler = new Compiler(config, node);
    compiler.compile();
    return compiler;
  }

  public getBuilder(filename?: string): Builder {
    return new Builder(Object.values(this.frames), this.config.i18n, {
      namespace: this.doc.meta.override ? '' : this.namespace,
      target: this.doc.meta.target,
      filename
    });
  }

  private getNewScope(type: ScopeType, name: string | null = null): number {
    const id = ++this.scopeID;
    this.frames[id] = { id, type, name, content: [], decls: [], count: 0 };
    return id;
  }

  public useScope(name: string, cb: () => void, type = ScopeType.EVENT) {
    if (this.scope.type !== ScopeType.NONE) {
      this.scope.content = this.buffer.slice();
    }
    this.buffer = [];
    this.stack.push(this.getNewScope(type, name));
    cb();
    // update this frame with any content the user's inserted
    this.scope.content = this.buffer.slice();
    // pop the frame from the stack and continue on from where we were
    this.stack.pop();
    // continue with content where the previous scope was suspended
    this.buffer = this.scope.content;
  }

  public getID() {
    const scope = (this.scope.count += 1);
    const count = scope.toString(16).padStart(2, '0');
    return match(this.scope ?? { type: ScopeType.NONE })
      .with({ type: ScopeType.NONE }, () => `${count}`)
      .otherwise(scope => `${scope.name}.${count}`);
  }

  /**
   * Given text, add an i18n entry and return its identifier.
   */
  public getI18nKey(text: string): string {
    if (!this.config.i18nEnabled) return text;
    const i18n = this.config.i18n;
    let key = Object.keys(i18n).find(k => i18n[k] === text);
    if (!key) key = this.getID();
    i18n[key] = text;
    return `i18n:${this.namespace}.${key}`;
  }

  private scopeID: number = 0;
  private frames: Record<number, Scope> = {};
  private stack: number[] = [];
  private state: State;
  private buffer: string[] = [];

  public get namespace() {
    return this.config.namespace;
  }

  public get scope() {
    const id = this.stack.at(-1)!;
    return this.frames[id];
  }

  public get line() {
    const last = this.buffer.length - 1;
    return this.buffer[last];
  }

  public write(text: string) {
    const prev = this.line ?? '';
    this.buffer[this.buffer.length - 1] = prev + text;
  }

  public writeLine(text: string) {
    this.buffer.push(text);
  }

  public declare(key: string, value: string) {
    this.scope.decls.push({ key, value });
  }

  public compile() {
    this.doc.compile(this, this.state as State);
  }

  public getBuffer() {
    return this.buffer;
  }

  private constructor(
    public config: Config,
    private doc: DocumentNode
  ) {
    this.state = {} as State;
    this.buffer = [];
    this.stack = [this.getNewScope(ScopeType.NONE)];
    const fns = [Object.values(this.config.macros), Object.values(this.config.commands)].flat();
    for (const fn of fns) {
      if (!fn.getInitialState) continue;
      this.state = fn.getInitialState?.(this.state);
    }
  }
}
