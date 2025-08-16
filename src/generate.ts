import { Compiler, Parser } from './lib';
import type { Y2DPartialConfig } from './types';

export function generate(config: Y2DPartialConfig, text: string) {
  const root = Parser.parse(text);
  const compiler = Compiler.compile(config, root);
  const builder = compiler.getBuilder(root.meta.filename ?? 'content.json');
  return builder.emit();
}
