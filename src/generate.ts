import { Compiler, Parser } from './lib';
import type { Config } from './lib/Config';

export function generate(config: Config, text: string) {
  const root = Parser.parse(text);
  const compiler = Compiler.compile(config, root);
  const builder = compiler.getBuilder(root.meta.filename ?? 'content.json');
  return builder.emit();
}
