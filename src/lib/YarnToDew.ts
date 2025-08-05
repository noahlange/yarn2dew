import { Builder } from './Builder';
import { Compiler } from './Compiler';
import { Parser } from './Parser';
import { Patcher } from './Patcher';

export class YarnToDew {
  private compiler: Compiler;
  private parser: Parser;
  private builder: Builder;
  private patcher: Patcher;

  public *emit() {
    yield* Object.entries(this.builder.emit());
  }

  public patch(file: string, content: string): string {
    return this.patcher.patch(file, JSON.parse(content));
  }

  constructor(name: string, data: string) {
    this.compiler = new Compiler(name);
    this.parser = new Parser();
    this.compiler.compile(this.parser.parse(data));
    this.builder = Compiler.builderFrom(this.compiler);
    this.patcher = new Patcher(this.builder);
  }
}
