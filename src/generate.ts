import { Compiler, Parser } from './lib';

export function generate(namespace: string, text: string) {
  const root = Parser.parse(text);
  const compiler = Compiler.compile(namespace, root);
  const builder = compiler.getBuilder(root.meta.filename ?? 'content.json');
  return builder.emit();
}
