import { match } from 'ts-pattern';
import { DocumentNode } from '../nodes';
import { Builder } from './Builder';

export enum ScopeType {
  NONE,
  EVENT
}

export interface Scope {
  id: number;
  type: ScopeType;
  prereq: Record<string, string>;
  name: string | null;
  content: string[];
  count: number;
  state: Partial<Record<ScopeType, string>>;
}

export class Compiler {
  public static compile(namespace: string, node: DocumentNode) {
    const compiler = new Compiler(namespace, node);
    compiler.compile();
    return compiler;
  }

  public getBuilder(filename?: string): Builder {
    return new Builder(Object.values(this.frames), this.i18n, {
      namespace: this.doc.meta.override ? '' : this.namespace,
      target: this.doc.meta.target,
      filename
    });
  }

  private getNewScope(type: ScopeType, name: string | null = null): number {
    const state = this.stack
      .map(s => this.frames[s])
      .filter(s => s.type !== ScopeType.NONE)
      .reduce((a, b) => ({ ...a, [b.type]: b.name }), {});
    const id = ++this.scopeID;
    this.frames[id] = { id, type, name, content: [], prereq: {}, state, count: 0 };
    return id;
  }

  private log(...text: unknown[]) {
    // console.log('\t'.repeat(this.stack.length), ...text);
  }

  public useScope(type: ScopeType, name: string, cb: () => void) {
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
    const key = this.getID();
    this.i18n[key] = `${text}`;
    return `i18n:${this.namespace}.${key}`;
  }

  private i18n: Record<string, string> = {};
  private scopeID: number = 0;
  private buffer: string[] = [];
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

  public compile() {
    this.doc.compile(this);
  }

  private constructor(
    public namespace: string,
    private doc: DocumentNode
  ) {
    this.stack = [this.getNewScope(ScopeType.NONE)];
    this.buffer = [];
  }
}
