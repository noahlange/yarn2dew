import { Compiler, Parser } from './lib';

export function generate(namespace: string, text: string) {
  const compiler = new Compiler(namespace);
  const parser = new Parser();
  const doc = parser.parse(text);
  compiler.compile(doc);
  return Compiler.builderFrom(compiler, doc.meta.source).emit();
}
