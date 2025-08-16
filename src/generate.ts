import { Compiler, Parser } from './lib';
import { Config } from './lib/Config';

export function generate(text: string, config = Config.test) {
  const root = Parser.parse(text);
  const compiler = Compiler.compile(config, root);
  const builder = compiler.getBuilder(root.meta.filename ?? 'content.json');
  return builder.emit();
}
