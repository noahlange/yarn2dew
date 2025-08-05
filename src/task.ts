import { watch } from 'fs/promises';
import { join } from 'path';

import { YarnToDew } from './lib';
import { getModId } from './utils';

const baseDir = process.cwd();
const id = await getModId();

console.log(`watching mod ${id} for changes`);

const watcher = watch(baseDir, { recursive: true });

for await (const event of watcher) {
  if (!event.filename?.endsWith('.yarn')) continue;

  console.log(`🧶 detected ${event.eventType} in "${event.filename}"`);
  const yarn = await Bun.file(join(baseDir, event.filename!)).text();
  const time = Date.now();
  const y2sdv = new YarnToDew(id, yarn);
  console.log(`\t compiled yarn in ${Date.now() - time}ms`);
  for (const [name] of y2sdv.emit()) {
    const path = join(baseDir, name);
    let data = await Bun.file(path).json();
    console.log(`\t\t updated ${name}`);
    await Bun.write(path, y2sdv.patch(name, data));
  }
}
