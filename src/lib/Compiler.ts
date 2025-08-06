import { match } from 'ts-pattern';
import { DocumentNode } from '../nodes';
import { Builder } from './Builder';

export enum ScopeType {
  NONE,
  EVENT,
  NPC,
  MAP
}

export interface Scope {
  id: number;
  type: ScopeType;
  prereq: Record<string, string>;
  name: string | null;
  content: string[];
  state: Partial<Record<ScopeType, string>>;
}

export class Compiler {
  public static builderFrom(compiler: Compiler): Builder {
    return new Builder(compiler.namespace, Object.values(compiler.frames), compiler.i18n);
  }

  private getNewScope(type: ScopeType, name: string | null = null): number {
    const state = this.stack
      .map(s => this.frames[s])
      .filter(s => s.type !== ScopeType.NONE)
      .reduce((a, b) => ({ ...a, [b.type]: b.name }), {});
    const id = ++this.scopeID;
    this.frames[id] = { id, type, name, content: [], prereq: {}, state };
    return id;
  }

  private log(...text: unknown[]) {
    // console.log('\t'.repeat(this.stack.length), ...text);
  }

  public useScope(type: ScopeType.EVENT | ScopeType.NPC | ScopeType.MAP, name: string, cb: () => void) {
    if (this.scope.type !== ScopeType.NONE) {
      this.scope.content = this.buffer.slice();
    }

    this.buffer = [];
    const typeName = ScopeType[type].toLowerCase();
    this.log(`<${typeName}:${name}>`);
    this.stack.push(this.getNewScope(type, name));
    cb();
    // update this frame with any content the user's inserted
    this.scope.content = this.buffer.slice();
    // pop the frame from the stack and continue on from where we were
    this.stack.pop();
    // continue with content where the previous scope was suspended
    this.buffer = this.scope.content;

    this.log(`</${typeName}:${name}>`);
  }

  public getID() {
    const scope = (this.scopeCounts[this.scope.id] ??= 0) + 1;
    this.scopeCounts[this.scope.id] = scope;
    const count = scope.toString(16).padStart(2, '0');
    return match(this.scope ?? { type: ScopeType.NONE })
      .with({ type: ScopeType.NONE }, () => `${count}`)
      .otherwise(scope => `${scope.name}.${count}`);
  }

  /**
   * Given text, add an i18n entry and return its identifier.
   */
  public getI18nKey(text: string): string {
    if (!(this.scope.id in this.scopeCounts)) {
      this.scopeCounts[this.scope.id] = 0;
    }
    const key = this.getID();
    this.i18n[key] = `${text}`;
    return `i18n:${this.namespace}.${key}`;
  }

  private i18n: Record<string, string> = {};
  private scopeID: number = 0;
  private buffer: string[] = [];
  private scopeCounts: Record<number, number> = {};
  private frames: Record<number, Scope> = {};
  private stack: number[] = [];

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

  public prepend(text: string) {
    const prev = this.buffer[0] ?? '';
    this.buffer[0] = prev + text;
  }

  public writeLine(text: string) {
    this.buffer.push(text);
  }

  public prependLine(text: string) {
    this.buffer.unshift(text);
  }

  public addReq(key: string, value: string) {
    this.scope.prereq[key] = value;
  }

  public compile(doc: DocumentNode) {
    this.stack = [this.getNewScope(ScopeType.NONE)];
    this.buffer = [];
    const location = doc.meta.location?.trim();
    const fn = () => doc.compile(this);

    if (location) {
      this.useScope(ScopeType.MAP, location, fn);
    } else {
      fn();
    }
  }

  constructor(public namespace: string) {}
}
